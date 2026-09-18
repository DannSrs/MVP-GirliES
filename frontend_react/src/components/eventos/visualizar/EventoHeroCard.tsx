import { CalendarDays, Clock, MapPin } from 'lucide-react';
import type { EventoGeral } from '../../../services/api';

interface EventoHeroCardProps {
  evento?: EventoGeral;
}

const TIPO_BADGE: Record<string, { label: string; badgeClass: string }> = {
  'Acolhida': { label: 'Acolhida & Recepção', badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'Oficina Prática': { label: '🔧 Oficina Prática (Lab Maker)', badgeClass: 'bg-violet-100 text-violet-700 border-violet-200' },
  'Roda de Conversa': { label: 'Roda de Conversa & Carreira', badgeClass: 'bg-blue-100 text-blue-700 border-blue-200' },
  'Mostra Científica': { label: 'Mostra Científica', badgeClass: 'bg-amber-100 text-amber-700 border-amber-200' },
  'Outros': { label: 'Evento Especial', badgeClass: 'bg-slate-100 text-slate-600 border-slate-200' },
};

function formatarData(data: string): string {
  const d = new Date(data + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function EventoHeroCard({ evento }: EventoHeroCardProps) {
  const titulo = evento?.titulo ?? 'Carregando evento...';
  const descricao = evento?.regimeEvento ?? '';
  const data = evento?.data ? formatarData(evento.data) : '—';
  const horario = evento?.horarioInicio
    ? `${evento.horarioInicio} às ${evento.horarioFim ?? '—'}`
    : '—';
  const local = evento?.local ?? 'Local não definido';

  const tipoCfg = TIPO_BADGE[evento?.tipoEvento ?? 'Outros'] ?? TIPO_BADGE['Outros'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex-shrink-0 relative">
      {/* Gradiente decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-girlies-purple/3 via-transparent to-transparent pointer-events-none" />

      <div className="p-8 flex flex-col lg:flex-row gap-8 justify-between items-start relative">
        {/* Esquerda — Título e badges */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Badges de tipo + status */}
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${tipoCfg.badgeClass}`}>
              {tipoCfg.label}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-3xl lg:text-[2.2rem] font-extrabold text-slate-800 leading-tight tracking-tight">
            {titulo}
          </h1>

          {/* Subtítulo / Resumo */}
          {evento?.descricao && (
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium">
              {evento.descricao}
            </p>
          )}
        </div>

        {/* Direita — Info Cards */}
        <div className="flex flex-col gap-3 w-full lg:w-80 flex-shrink-0">
          {/* Data */}
          <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">DATA PREVISTA</span>
              <span className="text-[13px] font-bold text-slate-800 mt-0.5">{data}</span>
            </div>
          </div>

          {/* Horário */}
          <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">HORÁRIO &amp; CARGA</span>
              <span className="text-[13px] font-bold text-slate-800 mt-0.5">{horario}</span>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">LOCAL NO CAMPUS</span>
              <span className="text-[13px] font-bold text-slate-800 mt-0.5">{local}</span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">Campus IFPE Belo Jardim</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
