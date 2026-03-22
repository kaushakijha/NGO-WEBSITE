import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Partner from "../../../models/Partner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    // Auto-seed for presentation if absolutely completely blank
    let count = await Partner.countDocuments();
    if (count === 0) {
      await Partner.insertMany([
        { companyName: "EcoBank India", logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80", treesSponsored: 25000, description: "Lead sponsor for Aravalli initiatives." },
        { companyName: "GreenTech Solutions", logoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80", treesSponsored: 10000, description: "Committed to carbon-neutral tech." },
      ]);
    }

    const partners = await Partner.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: partners });
  } catch (e: any) {
    return NextResponse.json({ data: [], error: e.message });
  }
}
