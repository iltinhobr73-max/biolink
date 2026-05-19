import { Suspense } from "react";
import { BuilderClient } from "./BuilderClient";

export default function BuilderPage({ searchParams }: { searchParams: { token?: string } }) {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-bold text-slate-400">Carregando editor…</div>}>
      <BuilderClient accessToken={searchParams?.token ?? ""} />
    </Suspense>
  );
}
