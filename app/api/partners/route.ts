import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Partner from "../../../models/Partner";

export const dynamic = "force-dynamic";

const seedPartners = [
  { companyName: "EcoBank India", logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80", treesSponsored: 25000, description: "Lead sponsor for Aravalli initiatives." },
  { companyName: "GreenTech Solutions", logoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80", treesSponsored: 10000, description: "Committed to carbon-neutral tech." },
];

export async function GET() {
  try {
    await dbConnect();

    let count = await Partner.countDocuments();
    if (count === 0) {
      await Partner.insertMany(seedPartners);
    }

    const partners = await Partner.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: partners });
  } catch {
    // DB unreachable — return seed data
    console.warn("[API /partners] Database unreachable, returning seed data");
    return NextResponse.json({ data: seedPartners.map((p, i) => ({ ...p, _id: `seed-${i}` })) });
  }
}
