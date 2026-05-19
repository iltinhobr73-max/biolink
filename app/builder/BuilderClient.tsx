"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Home, Loader2, LockKeyhole, RotateCcw, ShieldCheck } from "lucide-react";
import { Sidebar } from "@/components/builder/Sidebar";
import { Preview } from "@/components/builder/Preview";
import { generateHtmlContent } from "@/lib/templates/base-template";
import { useBuilderStore } from "@/store/useBuilderStore";

const EXPECTED_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? "";
const KIWIFY_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_KIWIFY_CHECKOUT_URL || "https://pay.kiwify.com.br/SEU-LINK-AQUI";

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

Arquivo gerado pelo BioLink Generator.`;
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

  useEffect(() => {
    if (!EXPECTED_TOKEN) {
      setAuthorized(true);
      setChecking(false);
      return;
    }

    try {
      const saved = sessionStorage.getItem("biolink_access");
      if (accessToken === EXPECTED_TOKEN || saved === EXPECTED_TOKEN) {
        sessionStorage.setItem("biolink_access", EXPECTED_TOKEN);
        setAuthorized(true);
      }
    } catch {
      if (accessToken === EXPECTED_TOKEN) setAuthorized(true);
    }

    setChecking(false);
  }, [accessToken]);

  const canExport = useMemo(() => profile.name.trim().length > 0, [profile.name]);

  function handleTokenSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EXPECTED_TOKEN) {
      setAuthorized(true);
      return;
    }

    if (tokenInput.trim() === EXPECTED_TOKEN) {
      try {
        sessionStorage.setItem("biolink_access", EXPECTED_TOKEN);
      } catch {}
      setAuthorized(true);
      setTokenError("");
      return;
    }

    setTokenError("Senha/token incorreto. Confira o acesso recebido após a compra.");
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
            Digite a senha/token enviado após a compra para liberar o criador de Link na Bio.
          </p>

          <form onSubmit={handleTokenSubmit} className="mt-7 space-y-3">
            <input
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Digite sua senha/token"
              className="w-full rounded-2xl border border-white/10 bg-white px-4 py-4 text-center text-base font-black text-slate-950 outline-none ring-yellow-300 transition placeholder:text-slate-400 focus:ring-4"
            />
            {tokenError ? <p className="text-center text-sm font-bold text-red-300">{tokenError}</p> : null}
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 text-base font-black text-slate-950 transition hover:bg-yellow-300">
              Entrar no editor <ShieldCheck size={18} />
            </button>
          </form>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/15">
              Voltar
            </Link>
            <a href={KIWIFY_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white/15">
              Comprar acesso
            </a>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Dica: para modo teste, deixe NEXT_PUBLIC_ACCESS_TOKEN vazio no arquivo .env.local.
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
            <h1 className="text-sm font-black text-slate-900 sm:text-base">🔗 BioLink Generator</h1>
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
