import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../../utils/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@renukiran.org";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = await signToken({ userId: "admin_env", role: "admin" });
      const response = NextResponse.json({ success: true, user: { name: "System Admin", email: ADMIN_EMAIL, role: "admin" } });
      response.cookies.set({
        name: "auth_token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 86400
      });
      return response;
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ userId: user._id.toString(), role: user.role });
    
    const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 86400
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
