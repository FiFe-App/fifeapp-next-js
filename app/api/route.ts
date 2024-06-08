import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  
    const results = await prisma.buziness.findMany({
        where: {
        }
    });

    return NextResponse.json({ results }, { status: 200 });
}