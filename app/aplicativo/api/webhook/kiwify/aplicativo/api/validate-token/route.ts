import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@upstash/redis";

const redis = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ valid: false, error: "Token não informado" }, { status: 400 });
    }

    const data = await redis.get(`token:${token}`);

    if (!data) {
      return NextResponse.json({ valid: false, error: "Token inválido ou expirado" });
    }

    const parsed = typeof data === "string" ? JSON.parse(data) : data;

    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      await redis.del(`token:${token}`);
      return NextResponse.json({ valid: false, error: "Token expirado" });
    }

    return NextResponse.json({ valid: true, email: parsed.email, name: parsed.name });
  } catch (error) {
    console.error("Validate token error:", error);
    return NextResponse.json({ valid: false, error: "Erro interno" }, { status: 500 });
  }
}
