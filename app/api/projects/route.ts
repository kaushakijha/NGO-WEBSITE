import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Project from "../../../models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    
    let count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany([
        { title: "Aravalli Reforestation 2026", description: "Restoring the degraded landscapes of the Aravalli hills with native drought-resistant flora.", location: "Rajasthan", targetTrees: 15000, treesPlanted: 11250, status: "Active" },
        { title: "Western Ghats Restoration", description: "Conserving the biodiversity hotspots of the Western Ghats.", location: "Karnataka", targetTrees: 25000, treesPlanted: 22500, status: "Active" },
        { title: "Sundarbans Mangrove Drive", description: "Protecting coastal lines by planting dense mangrove clusters.", location: "West Bengal", targetTrees: 10000, treesPlanted: 10000, status: "Completed" },
        { title: "Delhi NCR Urban Forest", description: "Creating dense Miyawaki forests to act as green lungs for the metro area.", location: "Delhi", targetTrees: 5000, treesPlanted: 2100, status: "Active" }
      ]);
    }

    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: projects });
  } catch (e: any) {
    return NextResponse.json({ data: [], error: e.message });
  }
}
