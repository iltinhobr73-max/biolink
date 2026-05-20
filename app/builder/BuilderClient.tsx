"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Home, Loader2, LockKeyhole, RotateCcw, ShieldCheck } from "lucide-react";
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
  const [authorized, setAuthorized] = useState(false);
  const [tokenInput, setTokenInput] = useState(accessToken);
  const [tokenError, setTokenError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    // Verifica se já tem sessão salva
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

  if (!authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(250,204,21,.22),transparent_35%),linear-gradient(135deg,#020617,#0f172a)] px-4 py-10 text-white">
        <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-400/25">
            <LockKeyhole size={26} />
          </div>
          <h1 className="mt-6 text-center text-2xl font-black">Acesso ao editor</h1>
          <p className="mt-3 text-center text-sm leading-6 text-slate-300">
            Digite o token enviado por e-mail após a compra para acessar o editor.
          </p>

          <form onSubmit={handleTokenSubmit} className="mt-7 space-y-3">
            <input
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Digite seu token (ex: ABCD-1234-WXYZ-5678)"
              className="w-full rounded-2xl border border-white/10 bg-white px-4 py-4 text-center text-base font-black text-slate-950 outline-none ring-yellow-300 transition placeholder:font-normal placeholder:text-slate-400 focus:ring-4"
            />
            {tokenError ? <p className="text-center text-sm font-bold text-red-300">{tokenError}</p> : null}
            <button
              type="submit"
              disabled={isValidating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 text-base font-black text-slate-950 transition hover:bg-yellow-300 disabled:opacity-50"
            >
              {isValidating ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
              {isValidating ? "Verificando..." : "Entrar no editor"}
            </button>
          </form>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/15">
              Voltar
            </Link>
            <a href={KIWIFY_CHECKOUT_URL} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/15">
              Comprar acesso
            </a>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Não recebeu o e-mail? Verifique a caixa de spam.
          </p>
        </section>
      </main>
    );
  }

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
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting || !canExport}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 disabled:opacity-50 sm:flex-none"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isExporting ? "Gerando…" : "Baixar ZIP"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-3 lg:grid-cols-[390px_1fr] lg:p-5">
        <Sidebar />
        <Preview />
      </main>
    </div>
  );
}
