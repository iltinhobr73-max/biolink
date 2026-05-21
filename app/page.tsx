import Link from "next/link";
import { ArrowRight, CheckCircle2, Instagram, MessageCircle, Music, ShoppingBag, Smartphone, Star, Youtube, Zap } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5585992717070?text=Oi!%20Vi%20o%20BioPage%20Pro%20e%20me%20interessei.%20Quero%20saber%20mais!";

const benefits = [
  { emoji: "⚡", title: "Pronto em minutos", desc: "Você me manda seus links e eu entrego sua página no ar. Sem complicação nenhuma." },
  { emoji: "📱", title: "Bonito no celular", desc: "Sua página fica linda no celular, que é onde seus seguidores vão clicar." },
  { emoji: "🎨", title: "Do seu jeito", desc: "Cores, foto, nome, bio e todos os seus links do jeito que você quiser." },
  { emoji: "🔗", title: "Link único", desc: "Um único link para colocar no Instagram que leva para tudo que você tem." },
];

const examples = [
  { icon: Instagram, label: "Influencers" },
  { icon: ShoppingBag, label: "Lojas" },
  { icon: Music, label: "Músicos" },
  { icon: Youtube, label: "Youtubers" },
  { icon: MessageCircle, label: "Afiliados" },
  { icon: Smartphone, label: "Freelancers" },
];

const testimonials = [
  { name: "Ana Paula", role: "Influencer", text: "Ficou incrível! Meus seguidores adoraram o visual novo.", stars: 5 },
  { name: "Carlos Mendes", role: "Loja online", text: "Profissional demais. Valeu cada centavo, recomendo!", stars: 5 },
  { name: "Juliana Costa", role: "Música", text: "Entregou super rápido e ficou exatamente como eu queria.", stars: 5 },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080810] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Syne:wght@700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .gradient-text { background: linear-gradient(135deg, #facc15, #fb923c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-glow { box-shadow: 0 0 40px rgba(250,204,21,0.08); }
        .btn-primary { background: linear-gradient(135deg, #facc15, #fb923c); color: #080810; font-weight: 900; transition: all 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(250,204,21,0.3); }
        .promo-bar { background: linear-gradient(135deg, #facc15, #fb923c); }
        .price-old { text-decoration: line-through; opacity: 0.5; }
      `}</style>

      {/* BARRA DE PROMOÇÃO */}
      <div className="promo-bar px-4 py-2 text-center text-xs font-black text-slate-950">
        🔥 PROMOÇÃO LIMITADA — De R$57,90 por apenas R$47 · Vagas limitadas!
      </div>

      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="text-yellow-400">🔗</span> BioPage Pro
        </div>
        <a href={WHATSAPP_URL} className="btn-primary rounded-full px-5 py-2.5 text-sm">
          Quero o meu link →
        </a>
      </nav>

      {/* HERO */}
      <section className="relative px-5 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* SELO DE PROMOÇÃO */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-300">
            🔥 Promoção por tempo limitado
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Seu link na bio<br />
            <span className="gradient-text">pronto e no ar</span><br />
            hoje mesmo.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Você me manda seus links — Instagram, WhatsApp, YouTube, loja — e eu entrego uma página profissional com seu link pronto para usar. <strong className="text-white">Sem precisar fazer nada.</strong>
          </p>

          {/* PREÇO */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="price-old text-xl text-white/40">R$57,90</span>
            <span className="font-display text-5xl font-extrabold gradient-text">R$47</span>
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">19% OFF</span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href={WHATSAPP_URL} className="btn-primary inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base">
              Quero meu link agora <ArrowRight size={18} />
            </a>
            <Link href="/builder" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10">
              Ver como funciona
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/30">Pagamento via Pix · Entrega rápida · Satisfação garantida</p>
        </div>

        {/* MOCKUP */}
        <div className="mx-auto mt-16 max-w-xs">
          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur card-glow">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0D2B4D] to-[#071A30] px-5 py-8 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-yellow-400 bg-yellow-400 text-3xl font-black text-slate-950">B</div>
              <h2 className="mt-4 font-display text-xl font-bold">Seu Nome Aqui</h2>
              <p className="mt-1 text-xs text-white/50">Sua bio aqui ✨</p>
              <div className="mt-5 space-y-2">
                {["Instagram", "WhatsApp", "YouTube", "Minha loja"].map((item) => (
                  <div key={item} className="rounded-xl bg-yellow-400 px-4 py-3 text-xs font-black text-slate-950">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">Como funciona</p>
          <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Simples assim.</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { n: "1", title: "Me chama", desc: "Entre em contato pelo WhatsApp e me manda seus links e informações." },
              { n: "2", title: "Eu crio", desc: "Monto sua página personalizada com seu visual e todos os seus links." },
              { n: "3", title: "Você usa", desc: "Recebe o link pronto e já coloca no seu Instagram. Simples!" },
            ].map((step) => (
              <div key={step.n} className="rounded-3xl border border-white/8 bg-white/5 p-6 text-left">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-400 font-display text-lg font-extrabold text-slate-950">
                  {step.n}
                </div>
                <h3 className="font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">O que você recebe</p>
            <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Tudo incluso nos R$47.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-white/8 bg-white/5 p-6 card-glow">
                <div className="text-3xl">{b.emoji}</div>
                <h3 className="font-display mt-4 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">Para quem é?</p>
          <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Para quem quer<br />parecer profissional.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {examples.map((e) => (
              <div key={e.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/80">
                <e.icon size={15} className="text-yellow-400" />
                {e.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">Depoimentos</p>
            <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Quem já tem, amou.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl border border-white/8 bg-white/5 p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-white/70">"{t.text}"</p>
                <div className="mt-4 border-t border-white/8 pt-4">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-yellow-400/20 bg-yellow-400/5 p-10 text-center card-glow">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-400/30 px-4 py-1.5 text-xs font-black text-red-300">
            🔥 Promoção por tempo limitado
          </div>
          <h2 className="font-display mt-2 text-4xl font-extrabold sm:text-5xl">
            Garanta agora<br />por apenas <span className="gradient-text">R$47</span>
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="price-old text-lg text-white/40">R$57,90</span>
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">19% OFF</span>
          </div>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/60">
            Entrega rápida. Sem complicação. Você só precisa me mandar seus links.
          </p>
          <a href={WHATSAPP_URL} className="btn-primary mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base">
            Quero meu link agora <ArrowRight size={18} />
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-400" /> Pagamento via Pix</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-400" /> Entrega rápida</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-green-400" /> Satisfação garantida</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-5 py-8 text-center text-sm text-white/20">
        BioPage Pro — Seu link na bio profissional, pronto e no ar hoje mesmo.
      </footer>
    </main>
  );
}
