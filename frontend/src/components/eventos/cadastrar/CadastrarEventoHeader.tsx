import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CadastrarEventoHeader() {
  return (
    <header className="flex flex-col gap-4 mb-6 sticky top-0 bg-slate-50/90 backdrop-blur-md pt-2 pb-4 z-10 border-b border-transparent">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
        <Link to="/" className="hover:text-girlies-purple transition-colors">workspace</Link>
        <span className="text-slate-300">/</span>
        <Link to="/" className="hover:text-girlies-purple transition-colors">painel</Link>
        <span className="text-slate-300">/</span>
        <Link to="/eventos" className="hover:text-girlies-purple transition-colors">eventos</Link>
        <span className="text-slate-300">/</span>
        <span className="text-girlies-purple font-bold">cadastrar novo encontro</span>
      </div>

      {/* Título + Botão Voltar */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-girlies-purple text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
              CAMPUS IFPE • EDIÇÃO 2026.2
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
              Modo Construtor Ativo
            </span>
          </div>

          <h1 className="text-3xl font-bold text-girlies-purple tracking-tight">
            Cadastrar Encontro no Campus
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Organize oficinas práticas, cafés com calouras e rodas de conversa nos espaços do IFPE com acolhimento, infraestrutura e apoio da comunidade GirliES.
          </p>
        </div>

        {/* Status da Reserva + Voltar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Card de status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3 min-w-[160px]">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Status da Reserva</span>
              <span className="text-[11px] font-bold text-amber-600">Aguardando Envio</span>
            </div>
          </div>

          <Link
            to="/eventos"
            className="flex items-center gap-2 text-slate-600 hover:text-girlies-purple hover:bg-girlies-purple/5 font-semibold text-sm transition-all px-4 py-2 rounded-xl border border-slate-200 hover:border-girlies-purple/30 bg-white shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Eventos
          </Link>
        </div>
      </div>
    </header>
  );
}
