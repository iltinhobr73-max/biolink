import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Globe2,
  LockKeyhole,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

const KIWIFY_CHECKOUT_URL = "/biopage-planos.html";

const features = [
  {
    icon: Palette,
    title: "Design pronto para vender",
    desc: "Temas modernos, gradientes, botões profissionais e preview em tempo real.",
  },
  {
    icon: Download,
    title: "Exporta o site pronto",
    desc: "O cliente baixa um ZIP com index.html e pode hospedar em Netlify, Vercel ou GitHub Pages.",
  },
  {
    icon: LockKeyhole,
    title: "Acesso por senha/token",
    desc: "Você vende na Kiwify e libera uma senha simples para o comprador usar o editor.",
  },
  {
    icon: Smartphone,
    title: "Mobile first",
    desc: "A página gerada fica bonita no celular, que é onde a maioria das pessoas abre links de bio.",
  },
];

const steps = [
  "O cliente vê a landing page e entende que vai criar um Link na Bio profissional.",
  "Ele clica em comprar e escolhe o plano que preferir.",
  "Após o pagamento, ele recebe a senha/token de acesso ao editor.",
  "Ele personaliza nome, foto, bio, links, cores e baixa o ZIP pronto.",
];

const idealFor = ["Influencers", "Afiliados", "Social media", "Músicos", "Freelancers", "Lojas pequenas", "Criadores de conteúdo", "Infoprodutores"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,.25),transparent_34%),radial-gradient(circle_at_75%_10%,rgba(59,130,246,.22),transparent_28%),linear-gradient(135deg,#020617,#0f172a_45%,#111827)]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-black tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-400/25">🔗</span>
            BioPage Pro
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/builder"
              className="hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15 sm:inline-flex"
            >
              Testar editor
            </Link>
            <a
              href={KIWIFY_CHECKOUT_URL}
              className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-yellow-300"
            >
              Comprar
            </a>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-yellow-200">
              A partir de R$ 19,90/mês · Acesso imediato
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[.95] tracking-tight sm:text-6xl lg:text-7xl">
              Crie um Link na Bio profissional em minutos.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Personalize sua página com seus links, escolha cores e temas, e baixe pronto para usar. Sem precisar saber programar.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={KIWIFY_CHECKOUT_URL}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-7 py-4 text-base font-black text-slate-950 shadow-xl shadow-yellow-400/20 transition hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                Ver planos e preços <ArrowRight size={18} />
              </a>
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Testar grátis
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Pagamento seguro via Kiwify · Acesso imediato · Garantia de 7 dias
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-8 rounded-[3rem] bg-yellow-400/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[2rem] bg-slate-950 p-4">
                <div className="rounded-[1.6rem] bg-gradient-to-br from-[#0D2B4D] to-[#071A30] px-5 py-8 text-center shadow-2xl">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-yellow-400 bg-yellow-400 text-4xl font-black text-slate-950 shadow-xl">B</div>
                  <h2 className="mt-5 text-2xl font-black">BioPage Pro</h2>
                  <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-white/70">Todos os seus links importantes em um só lugar.</p>
                  <div className="mt-7 space-y-3">
                    {["Instagram", "WhatsApp", "YouTube", "Minha loja"].map((item) => (
                      <div key={item} className="rounded-2xl bg-yellow-400 px-4 py-4 text-sm font-black text-slate-950 shadow-lg shadow-black/20">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-7 text-[10px] font-black uppercase tracking-[.25em] text-white/35">Preview real</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-slate-950 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.25em] text-yellow-600">O que você está comprando</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Seu link na bio profissional, do jeito certo.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Você não compra "código". Você compra facilidade: entra no editor, coloca os próprios links, personaliza o visual e baixa uma página pronta.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <feature.icon className="text-yellow-500" size={30} />
                <h3 className="mt-5 text-lg font-black">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 text-slate-950 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-yellow-700">
              <Sparkles size={15} /> Como funciona
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Simples assim.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Em menos de 5 minutos você já tem seu link na bio profissional no ar.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-yellow-300">{index + 1}</div>
                <p className="pt-2 text-base font-bold leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-slate-950 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
            <Globe2 className="text-yellow-300" size={36} />
            <h2 className="mt-5 text-3xl font-black">Para quem é?</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {idealFor.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/80">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-200 bg-yellow-50 p-8 shadow-sm">
            <CheckCircle2 className="text-yellow-600" size={36} />
            <h2 className="mt-5 text-3xl font-black">Pronto para usar</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Acesso imediato após a compra. Você recebe um token por e-mail e já pode começar a criar sua página.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/builder" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5">
                Testar grátis <Zap size={16} />
              </Link>
              <a href={KIWIFY_CHECKOUT_URL} className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5">
                Ver planos
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-center text-sm font-semibold text-slate-500">
        BioPage Pro — Crie seu link na bio profissional e conquiste mais clientes.
      </footer>
    </main>
  );
}
