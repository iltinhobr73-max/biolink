import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) token += "-";
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webhookSecret = process.env.KIWIFY_WEBHOOK_SECRET;

    const kiwifyToken = req.nextUrl.searchParams.get("token") || body.token;
    if (webhookSecret && kiwifyToken !== webhookSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event = body.order_status || body.event;
    const email = body.Customer?.email || body.customer?.email;
    const name = body.Customer?.full_name || body.customer?.full_name || "Cliente";

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    if (event === "paid" || event === "order_approved" || event === "subscription_renewed") {
      const token = generateToken();
      const expiresAt = Date.now() + 31 * 24 * 60 * 60 * 1000;

      await redis.set(`token:${token}`, JSON.stringify({
        email, name, expiresAt, createdAt: Date.now(),
      }), { ex: 31 * 24 * 60 * 60 });

      await redis.set(`email:${email}`, token, { ex: 31 * 24 * 60 * 60 });

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://biolink-nu-seven.vercel.app";
      const builderUrl = `${siteUrl}/builder?token=${token}`;

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "✅ Seu acesso ao BioPage Pro está pronto!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0f8; padding: 40px; border-radius: 16px;">
            <h1 style="color: #f0f0f8; text-align: center;">🔗 BioPage Pro</h1>
            <p style="color: #b0b0d0;">Olá, <strong style="color: #f0f0f8;">${name}</strong>!</p>
            <p style="color: #b0b0d0;">Sua compra foi confirmada! Seu token de acesso:</p>
            <div style="background: #13131a; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <p style="color: #a78bfa; font-size: 28px; font-weight: bold; letter-spacing: 4px; margin: 0;">${token}</p>
            </div>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${builderUrl}" style="background: linear-gradient(135deg, #7c5cfc, #c084fc); color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold;">
                Acessar o editor →
              </a>
            </div>
            <p style="color: #7070a0; font-size: 13px; text-align: center;">Acesso válido por 31 dias.</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, token });
    }

    if (event === "subscription_canceled" || event === "refunded") {
      const savedToken = await redis.get(`email:${email}`);
      if (savedToken) {
        await redis.del(`token:${savedToken}`);
        await redis.del(`email:${email}`);
      }
      return NextResponse.json({ success: true, message: "Access revoked" });
    }

    return NextResponse.json({ success: true, message: "Event ignored" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
