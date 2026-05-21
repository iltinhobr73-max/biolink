"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Home, Loader2, LockKeyhole, RotateCcw, ShieldCheck, Unlock } from "lucide-react";
import { Sidebar } from "@/components/builder/Sidebar";
import { Preview } from "@/components/builder/Preview";
import { generateHtmlContent } from "@/lib/templates/base-template";
import { useBuilderStore } from "@/store/useBuilderStore";

const KIWIFY_CHECKOUT_URL = "/biopage-planos.html";

function buildReadme(name: string): string {
  return `BioLink de ${name || "cliente"}

COMO HOSPEDAR GRÁTIS

OPÇÃO 1 — Netlify Drop
1. Acesse https://app.netlify.com/drop
2. Extraia este ZIP
3. Arraste a pasta extraída para o Netlify
4. Pronto, você recebe uma URL pública

OPÇÃO 2 — GitHub Pages
1. Crie um repositório público
2. Envie o index.html
3. Ative Pages em Settings > Pages

OPÇÃO 3 — Vercel
1. Crie um projeto simples
2. Envie o index.html
3. Publique

Arquivo gerado pelo BioPage Pro.`;
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "meu-biolink"
  );
}

export function BuilderClient({ accessToken }: { accessToken: string }) {
  const store = useBuilderStore();
  const { hasHydrated, profile, resetStore } = store;
  const [isExporting, setIsExporting] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false); // true = pode baixar
  const [tokenInput, setTokenInput] = useState(accessToken);
  const [tokenError, setTokenError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showTokenPanel, setShowTokenPanel] = useState(false);

  useEffect(() => {
    // Verifica se já tem sessão salva (comprou antes)
    try {
      const saved = sessionStorage.getItem("biolink_access");
      if (saved === "authorized") {
        setAuthorized(true);
        setChecking(false);
        return;
      }
    } catch {}

    // Se veio token pela URL, valida automaticamente
    if (accessToken) {
      validateToken(accessToken).then((valid) => {
        if (valid) {
          try { sessionStorage.setItem("biolink_access", "authorized"); } catch {}
          setAuthorized(true);
        }
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, [accessToken]);

  async function validateToken(token: string): Promise<boolean> {
    try {
      const res = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim().toUpperCase() }),
      });
      const data = await res.json();
      return data.valid === true;
    } catch {
      return false;
    }
  }

  const canExport = useMemo(() => profile.name.trim().length > 0, [profile.name]);

  async function handleTokenSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsValidating(true);
    setTokenError("");

    const valid = await validateToken(tokenInput);

    if (valid) {
      try { sessionStorage.setItem("biolink_access", "authorized"); } catch {}
      setAuthorized(true);
      setShowTokenPanel(false);
    } else {
      setTokenError("Token inválido ou expirado. Confira o e-mail recebido após a compra.");
    }

    setIsValidating(false);
  }

  async function handleExport() {
    setIsExporting(true);
    try {
      const JSZip = (await import("jszip")).default;
      const { saveAs } = await import("file-saver");
      const zip = new JSZip();
      zip.file("index.html", generateHtmlContent(store));
      zip.file("README.txt", buildReadme(profile.name));
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `biolink-${slugify(profile.name)}.zip`);
    } catch (error) {
      console.error(error);
      alert("Não foi possível gerar o ZIP. Confira os dados e tente novamente.");
    } finally {
      setIsExporting(false);
    }
  }

  if (checking || !hasHydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <Loader2 className="animate-spin text-slate-400" size={34} />
      </div>
    );
  }

  // ─── EDITOR (teste grátis ou autorizado) ───────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-3 py-3 backdrop-blur sm:px-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
              <Home size={16} /> Início
            </Link>
            <h1 className="text-sm font-black text-slate-900 sm:text-base">🔗 BioPage Pro</h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetStore}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:flex-none"
            >
              <RotateCcw size={15} /> Resetar
            </button>

            {authorized ? (
              // Botão de download — só aparece para quem tem token válido
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting || !canExport}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 disabled:opacity-50 sm:flex-none"
              >
                {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                {isExporting ? "Gerando…" : "Baixar ZIP"}
              </button>
            ) : (
              // Botão para abrir painel de token — aparece no modo teste
              <button
                type="button"
                onClick={() => setShowTokenPanel((v) => !v)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 sm:flex-none"
              >
                <Unlock size={16} />
                Já comprei — liberar download
              </button>
            )}
          </div>
        </div>

        {/* Painel de token inline (só aparece quando usuário clica em "Já comprei") */}
        {!authorized && showTokenPanel && (
          <div className="mx-auto mt-3 max-w-7xl">
            <form onSubmit={handleTokenSubmit} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2">
                <LockKeyhole size={16} className="shrink-0 text-slate-400" />
                <input
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Digite seu token (ex: ABCD-1234-WXYZ-5678)"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-900 outline-none ring-yellow-300 placeholder:font-normal placeholder:text-slate-400 focus:ring-2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isValidating}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-yellow-300 disabled:opacity-50"
                >
                  {isValidating ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
                  {isValidating ? "Verificando..." : "Liberar"}
                </button>
                <a
                  href={KIWIFY_CHECKOUT_URL}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Comprar
                </a>
              </div>
              {tokenError && (
                <p className="w-full text-center text-xs font-bold text-red-500 sm:text-left">{tokenError}</p>
              )}
            </form>
          </div>
        )}
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-3 lg:grid-cols-[390px_1fr] lg:p-5">
        <Sidebar />
        <Preview />
      </main>
    </div>
  );
}
