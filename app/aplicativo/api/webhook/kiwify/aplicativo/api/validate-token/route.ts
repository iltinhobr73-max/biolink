import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ valid: false });
    }

    const staticToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? "";

    if (staticToken === "") {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: token === staticToken });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
