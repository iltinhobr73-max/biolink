"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, ImagePlus, Link2, Palette, Plus, Trash2, User, X } from "lucide-react";
import { Theme, useBuilderStore } from "@/store/useBuilderStore";

const iconOptions = [
  ["link", "🔗 Link"],
  ["instagram", "📸 Instagram"],
  ["whatsapp", "💬 WhatsApp"],
  ["youtube", "▶️ YouTube"],
  ["tiktok", "🎵 TikTok"],
  ["twitter", "𝕏 Twitter/X"],
  ["linkedin", "💼 LinkedIn"],
  ["github", "💻 GitHub"],
  ["spotify", "🎧 Spotify"],
  ["twitch", "🟣 Twitch"],
];

const themes: Array<{ label: string } & Theme> = [
  { label: "Navy Gold", bgGradientFrom: "#0D2B4D", bgGradientTo: "#071A30", buttonColor: "#F2B705", textColor: "#FFFFFF", cardStyle: "solid", radius: "rounded" },
  { label: "Roxo Neon", bgGradientFrom: "#2D1B69", bgGradientTo: "#0F0A2E", buttonColor: "#A855F7", textColor: "#FFFFFF", cardStyle: "glass", radius: "rounded" },
  { label: "Matrix", bgGradientFrom: "#052E16", bgGradientTo: "#020F07", buttonColor: "#22C55E", textColor: "#FFFFFF", cardStyle: "solid", radius: "soft" },
  { label: "Sunset", bgGradientFrom: "#431407", bgGradientTo: "#1C0803", buttonColor: "#F97316", textColor: "#FFFFFF", cardStyle: "solid", radius: "pill" },
  { label: "Clean", bgGradientFrom: "#F8FAFC", bgGradientTo: "#E2E8F0", buttonColor: "#0F172A", textColor: "#0F172A", cardStyle: "solid", radius: "rounded" },
  { label: "Pink Pro", bgGradientFrom: "#4A0020", bgGradientTo: "#1A000B", buttonColor: "#EC4899", textColor: "#FFFFFF", cardStyle: "glass", radius: "pill" },
];

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/15";
const labelClass = "text-[11px] font-black uppercase tracking-[.18em] text-slate-400";

type Tab = "profile" | "links" | "design";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function normalizeUrl(value: string) {
  if (!value.trim()) return value;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return value;
  return `https://${value}`;
}

export function Sidebar() {
  const [tab, setTab] = useState<Tab>("profile");
  const [avatarError, setAvatarError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { profile, theme, links, setProfile, setTheme, addLink, updateLink, removeLink, reorderLinks } = useBuilderStore();

  function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarError("");
    if (!file.type.startsWith("image/")) {
      setAvatarError("Envie um arquivo de imagem.");
      return;
    }
    if (file.size > 900 * 1024) {
      setAvatarError("Use uma imagem com até 900 KB para o HTML ficar leve.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProfile({ avatar: String(reader.result || "") });
    reader.readAsDataURL(file);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= links.length) return;
    const next = [...links];
    [next[index], next[target]] = [next[target], next[index]];
    reorderLinks(next);
  }

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: "profile", label: "Perfil", icon: <User size={15} /> },
    { id: "links", label: "Links", icon: <Link2 size={15} /> },
    { id: "design", label: "Design", icon: <Palette size={15} /> },
  ];

  return (
    <aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-lg font-black text-slate-900">Editor</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">Personalize e veja o resultado ao lado.</p>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-black transition ${tab === item.id ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[calc(100vh-15rem)] overflow-y-auto p-4 lg:max-h-[calc(100vh-18rem)]">
        {tab === "profile" && (
          <section className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <span className={labelClass}>Avatar</span>
              <div className="mt-3 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-yellow-400 hover:text-yellow-500"
                >
                  {profile.avatar ? <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" /> : <ImagePlus size={24} />}
                </button>
                <div className="min-w-0 flex-1">
                  <button type="button" onClick={() => fileRef.current?.click()} className="text-sm font-black text-slate-800 underline decoration-yellow-400 decoration-2 underline-offset-4">
                    {profile.avatar ? "Trocar imagem" : "Enviar imagem"}
                  </button>
                  <p className="mt-1 text-xs leading-5 text-slate-500">PNG, JPG ou WEBP. Até 900 KB.</p>
                  {profile.avatar && (
                    <button type="button" onClick={() => setProfile({ avatar: "" })} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600">
                      <X size={12} /> Remover
                    </button>
                  )}
                </div>
              </div>
              {avatarError && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{avatarError}</p>}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadAvatar} />
            </div>

            <Field label="Nome ou marca">
              <input className={inputClass} value={profile.name} maxLength={60} placeholder="Ex: João Silva" onChange={(event) => setProfile({ name: event.target.value })} />
            </Field>
            <Field label="Bio curta">
              <textarea className={`${inputClass} min-h-28 resize-none`} value={profile.bio} maxLength={170} placeholder="Ex: Designer, criador de conteúdo e empreendedor." onChange={(event) => setProfile({ bio: event.target.value })} />
            </Field>
          </section>
        )}

        {tab === "links" && (
          <section className="space-y-4">
            <button type="button" onClick={addLink} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-slate-950">
              <Plus size={16} /> Adicionar link
            </button>

            {links.length === 0 && <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm text-slate-500">Nenhum link adicionado ainda.</p>}

            {links.map((link, index) => (
              <article key={link.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500">Link {index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => updateLink(link.id, { enabled: !link.enabled })} className={`rounded-full px-3 py-1 text-xs font-black ${link.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                      {link.enabled ? "Ativo" : "Oculto"}
                    </button>
                    <button type="button" aria-label="Mover para cima" onClick={() => move(index, -1)} disabled={index === 0} className="rounded-lg p-1.5 text-slate-500 hover:bg-white disabled:opacity-30"><ChevronUp size={15} /></button>
                    <button type="button" aria-label="Mover para baixo" onClick={() => move(index, 1)} disabled={index === links.length - 1} className="rounded-lg p-1.5 text-slate-500 hover:bg-white disabled:opacity-30"><ChevronDown size={15} /></button>
                    <button type="button" aria-label="Remover" onClick={() => removeLink(link.id)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"><Trash2 size={15} /></button>
                  </div>
                </div>
                <div className="space-y-3">
                  <input className={inputClass} value={link.title} placeholder="Título do botão" onChange={(event) => updateLink(link.id, { title: event.target.value })} />
                  <input className={inputClass} value={link.url} placeholder="https://seulink.com" onBlur={(event) => updateLink(link.id, { url: normalizeUrl(event.target.value) })} onChange={(event) => updateLink(link.id, { url: event.target.value })} />
                  <select className={inputClass} value={link.icon} onChange={(event) => updateLink(link.id, { icon: event.target.value })}>
                    {iconOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
              </article>
            ))}
          </section>
        )}

        {tab === "design" && (
          <section className="space-y-5">
            <div>
              <span className={labelClass}>Temas prontos</span>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {themes.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setTheme(preset)}
                    className="rounded-2xl border border-slate-200 bg-white p-2 text-left transition hover:border-yellow-400"
                  >
                    <div className="h-16 rounded-xl" style={{ background: `linear-gradient(135deg, ${preset.bgGradientFrom}, ${preset.bgGradientTo})` }} />
                    <p className="mt-2 text-xs font-black text-slate-700">{preset.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Fundo 1"><input type="color" className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1" value={theme.bgGradientFrom} onChange={(e) => setTheme({ bgGradientFrom: e.target.value })} /></Field>
              <Field label="Fundo 2"><input type="color" className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1" value={theme.bgGradientTo} onChange={(e) => setTheme({ bgGradientTo: e.target.value })} /></Field>
              <Field label="Botão"><input type="color" className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1" value={theme.buttonColor} onChange={(e) => setTheme({ buttonColor: e.target.value })} /></Field>
              <Field label="Texto"><input type="color" className="h-11 w-full rounded-xl border border-slate-200 bg-white p-1" value={theme.textColor} onChange={(e) => setTheme({ textColor: e.target.value })} /></Field>
            </div>

            <Field label="Estilo dos botões">
              <select className={inputClass} value={theme.cardStyle} onChange={(e) => setTheme({ cardStyle: e.target.value as Theme["cardStyle"] })}>
                <option value="solid">Sólido</option>
                <option value="glass">Vidro</option>
                <option value="outline">Contorno</option>
              </select>
            </Field>
            <Field label="Arredondamento">
              <select className={inputClass} value={theme.radius} onChange={(e) => setTheme({ radius: e.target.value as Theme["radius"] })}>
                <option value="soft">Suave</option>
                <option value="rounded">Moderno</option>
                <option value="pill">Pílula</option>
              </select>
            </Field>
          </section>
        )}
      </div>
    </aside>
  );
}
