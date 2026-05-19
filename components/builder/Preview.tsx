"use client";

import { ExternalLink } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";

const icons: Record<string, string> = {
  instagram: "📸",
  whatsapp: "💬",
  youtube: "▶️",
  tiktok: "🎵",
  twitter: "𝕏",
  linkedin: "💼",
  github: "💻",
  spotify: "🎧",
  twitch: "🟣",
  link: "🔗",
};

function contrast(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#0f172a" : "#ffffff";
}

function radiusClass(radius: string) {
  if (radius === "pill") return "rounded-full";
  if (radius === "soft") return "rounded-xl";
  return "rounded-2xl";
}

export function Preview() {
  const { profile, theme, links } = useBuilderStore();
  const activeLinks = links.filter((link) => link.enabled);
  const buttonText = contrast(theme.buttonColor);
  const initial = profile.name.trim().charAt(0).toUpperCase() || "B";

  function linkStyle(): React.CSSProperties {
    if (theme.cardStyle === "glass") {
      return {
        color: theme.textColor,
        background: "rgba(255,255,255,.14)",
        border: "1px solid rgba(255,255,255,.22)",
        backdropFilter: "blur(12px)",
      };
    }
    if (theme.cardStyle === "outline") {
      return {
        color: theme.textColor,
        background: "transparent",
        border: `2px solid ${theme.buttonColor}`,
      };
    }
    return {
      color: buttonText,
      background: theme.buttonColor,
      border: "1px solid rgba(255,255,255,.08)",
    };
  }

  return (
    <section className="grid min-h-[720px] place-items-center overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,white,#e2e8f0)] p-4 shadow-soft sm:p-8">
      <div className="w-full max-w-[410px]">
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-xs font-black text-slate-500 shadow-sm backdrop-blur">
          <span>Preview em tempo real</span>
          <span className="inline-flex items-center gap-1 text-slate-400"><ExternalLink size={13} /> 390 × 760</span>
        </div>

        <div className="relative mx-auto h-[760px] max-h-[78vh] w-full max-w-[390px] overflow-hidden rounded-[3rem] border-[10px] border-slate-950 bg-slate-950 shadow-2xl">
          <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />
          <div className="h-full overflow-y-auto px-5 pb-8 pt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ background: `linear-gradient(160deg, ${theme.bgGradientFrom}, ${theme.bgGradientTo})` }}>
            <div className="flex flex-col items-center text-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name || "Avatar"} className="h-28 w-28 rounded-full object-cover shadow-2xl" style={{ border: `4px solid ${theme.buttonColor}` }} />
              ) : (
                <div className="grid h-28 w-28 place-items-center rounded-full text-5xl font-black shadow-2xl" style={{ background: theme.buttonColor, color: buttonText, border: `4px solid rgba(255,255,255,.25)` }}>
                  {initial}
                </div>
              )}

              <h1 className="mt-5 max-w-full break-words text-2xl font-black leading-tight" style={{ color: theme.textColor }}>
                {profile.name.trim() || "Seu Nome"}
              </h1>
              <p className="mt-2 max-w-[300px] break-words text-sm leading-6 opacity-75" style={{ color: theme.textColor }}>
                {profile.bio.trim() || "Sua bio aparece aqui..."}
              </p>

              <div className="mt-7 flex w-full flex-col gap-3">
                {activeLinks.length === 0 ? (
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-sm font-semibold text-white/60">Adicione links para visualizar os botões.</div>
                ) : (
                  activeLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex min-h-14 items-center gap-3 px-4 py-3 text-sm font-black shadow-lg shadow-black/15 transition hover:-translate-y-0.5 ${radiusClass(theme.radius)}`}
                      style={linkStyle()}
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-black/10">{icons[link.icon] || icons.link}</span>
                      <span className="min-w-0 flex-1 truncate text-center">{link.title || "Novo link"}</span>
                      <span className="w-8 opacity-45 transition group-hover:opacity-100">↗</span>
                    </a>
                  ))
                )}
              </div>

              <p className="mt-8 text-[11px] font-bold uppercase tracking-[.2em] opacity-35" style={{ color: theme.textColor }}>BioLink Generator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
