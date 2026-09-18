import { ArrowLeft, Edit, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventoGeral } from '../../../services/api';

interface VisualizarEventoHeaderProps {
  evento?: EventoGeral;
}

function getStatusConfig(evento?: EventoGeral) {
  if (!evento) return { label: 'Carregando...', bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' };

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataEvento = new Date(evento.data + 'T00:00:00');

  if (dataEvento >= hoje) {
    return {
      label: 'Confirmado & Inscrições Abertas',
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500 animate-pulse',
    };
  }
  return {
    label: 'Concluído',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  };
}

export function VisualizarEventoHeader({ evento }: VisualizarEventoHeaderProps) {
  const status = getStatusConfig(evento);

  return (
    <header className="flex flex-col gap-5 mb-6 sticky top-0 bg-[#f8f9fa]/90 backdrop-blur-md pt-2 pb-4 z-20 border-b border-transparent flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-girlies-purple" />
        GirliES
        <span className="text-slate-300">/</span>
        <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded-full font-bold tracking-wider">
          ● Semestre 2026.2
        </span>
      </div>

      {/* Navegação + Status + Editar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Link
            to="/eventos"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-semibold text-[11px] transition-all px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Encontros no Campus
          </Link>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider ${status.bg} ${status.text}`}>
            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
            {status.label}
          </div>
        </div>

        {evento?.id && (
          <Link
            to={`/eventos`}
            className="flex items-center gap-2 text-slate-800 hover:text-girlies-purple font-bold text-[10px] transition-all px-4 py-2 rounded-2xl bg-[#f4f2f6] hover:bg-girlies-purple/10 leading-tight"
          >
            <Edit className="w-4 h-4 text-girlies-purple" />
            <div className="flex flex-col text-left">
              <span>Editar</span>
              <span>Evento</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
