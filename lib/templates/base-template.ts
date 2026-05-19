import { LinkItem, Profile, Theme } from "@/store/useBuilderStore";

export interface BuilderStoreSnapshot {
  profile: Profile;
  theme: Theme;
  links: LinkItem[];
}

const iconText: Record<string, string> = {
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "#";
  try {
    const url = new URL(trimmed);
    if (["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) return escapeHtml(trimmed);
    return "#";
  } catch {
    return "#";
  }
}

function contrast(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#0f172a" : "#ffffff";
}

function radiusValue(radius: Theme["radius"]) {
  if (radius === "pill") return "999px";
  if (radius === "soft") return "14px";
  return "20px";
}

function linkCss(theme: Theme) {
  const buttonText = contrast(theme.buttonColor);
  if (theme.cardStyle === "glass") {
    return `background:rgba(255,255,255,.14);color:${theme.textColor};border:1px solid rgba(255,255,255,.24);backdrop-filter:blur(14px);`;
  }
  if (theme.cardStyle === "outline") {
    return `background:transparent;color:${theme.textColor};border:2px solid ${theme.buttonColor};`;
  }
  return `background:${theme.buttonColor};color:${buttonText};border:1px solid rgba(255,255,255,.08);`;
}

function renderLinks(links: LinkItem[], theme: Theme) {
  const activeLinks = links.filter((link) => link.enabled);
  if (!activeLinks.length) return `<p class="empty">Nenhum link adicionado.</p>`;

  return activeLinks
    .map((link) => {
      const title = escapeHtml(link.title || "Novo link");
      const icon = iconText[link.icon] || iconText.link;
      return `<a class="bio-link" href="${safeUrl(link.url)}" target="_blank" rel="noopener noreferrer" style="${linkCss(theme)}border-radius:${radiusValue(theme.radius)};">
        <span class="bio-icon">${icon}</span>
        <span class="bio-title">${title}</span>
        <span class="bio-arrow">↗</span>
      </a>`;
    })
    .join("\n");
}

export function generateHtmlContent({ profile, theme, links }: BuilderStoreSnapshot): string {
  const name = escapeHtml(profile.name.trim() || "Seu Nome");
  const bio = escapeHtml(profile.bio.trim() || "");
  const initial = escapeHtml((profile.name.trim().charAt(0) || "B").toUpperCase());
  const avatar = profile.avatar
    ? `<img class="avatar" src="${profile.avatar}" alt="${name}" />`
    : `<div class="avatar avatar-placeholder">${initial}</div>`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${bio}" />
  <meta property="og:title" content="${name}" />
  <meta property="og:description" content="${bio}" />
  <meta property="og:type" content="website" />
  <title>${name} — BioLink</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:linear-gradient(160deg,${theme.bgGradientFrom},${theme.bgGradientTo});color:${theme.textColor};display:flex;align-items:center;justify-content:center;padding:32px 16px;-webkit-font-smoothing:antialiased}.page{width:100%;max-width:470px;text-align:center;animation:show .45s ease both}@keyframes show{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}.avatar{width:116px;height:116px;border-radius:999px;object-fit:cover;border:4px solid ${theme.buttonColor};box-shadow:0 20px 60px rgba(0,0,0,.28),0 0 0 8px rgba(255,255,255,.08)}.avatar-placeholder{margin:0 auto;display:grid;place-items:center;background:${theme.buttonColor};color:${contrast(theme.buttonColor)};font-size:48px;font-weight:950}.name{margin-top:22px;font-size:30px;line-height:1.05;font-weight:950;letter-spacing:-.04em;word-break:break-word}.bio{margin:12px auto 0;max-width:350px;font-size:15px;line-height:1.65;opacity:.76;word-break:break-word}.links{margin-top:30px;display:flex;flex-direction:column;gap:13px}.bio-link{min-height:58px;display:flex;align-items:center;gap:12px;padding:13px 16px;text-decoration:none;font-size:15px;font-weight:850;box-shadow:0 14px 30px rgba(0,0,0,.18);transition:transform .18s ease,box-shadow .18s ease}.bio-link:hover{transform:translateY(-3px);box-shadow:0 20px 40px rgba(0,0,0,.26)}.bio-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:999px;background:rgba(0,0,0,.10);flex:0 0 auto}.bio-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}.bio-arrow{width:34px;opacity:.5}.empty{padding:24px;border:1px solid rgba(255,255,255,.18);border-radius:20px;background:rgba(255,255,255,.08);font-size:14px;opacity:.7}.footer{margin-top:30px;font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;opacity:.32}@media(max-width:480px){body{align-items:flex-start;padding-top:34px}.name{font-size:26px}.bio-link{font-size:14px}}
  </style>
</head>
<body>
  <main class="page">
    ${avatar}
    <h1 class="name">${name}</h1>
    ${bio ? `<p class="bio">${bio}</p>` : ""}
    <section class="links" aria-label="Links principais">
      ${renderLinks(links, theme)}
    </section>
    <footer class="footer">BioLink Generator</footer>
  </main>
</body>
</html>`;
}

export function generateTemplate(profile: Profile, theme: Theme, links: LinkItem[]) {
  return generateHtmlContent({ profile, theme, links });
}
