import { Link } from 'react-router-dom';
import { Home, PlusCircle } from 'lucide-react';

export function EventosHeader() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 pt-7 pb-6 flex-shrink-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-girlies-purple/5 to-transparent pointer-events-none" />

      {/* Breadcrumb */}
      <div className="relative flex items-center gap-2 mb-4 font-mono text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Home className="w-3 h-3" />
          <Link to="/" className="hover:text-girlies-purple hover:underline">workspace</Link>
        </span>
        <span className="text-slate-300">&gt;</span>
        <a href="#" className="hover:text-girlies-purple hover:underline text-girlies-purple font-semibold">painel</a>
        <span className="text-slate-300">&gt;</span>
        <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded font-semibold">Semestre 2026.2</span>
      </div>

      {/* Badges de campus */}
      <div className="relative flex flex-wrap items-center gap-2 mb-3">
        <span className="bg-girlies-purple text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
          IFPE • CAMPUS BELO JARDIM
        </span>
        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
          Semestre Ativo 2026.2
        </span>
      </div>

      {/* Título + CTA */}
      <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-girlies-purple mb-1.5">
            Eventos &amp; Encontros no Campus
          </h1>
          <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
            Planejamento e organização de acolhida de calouras, oficinas práticas nos
            laboratórios e encontros de comunidade no IFPE.
          </p>
        </div>

        <Link
          to="/eventos/cadastrar"
          className="flex items-center justify-center gap-2 bg-girlies-purple hover:bg-[#3d004d] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-girlies-purple/20 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          Cadastrar Encontro Interno
        </Link>
      </div>
    </section>
  );
}
