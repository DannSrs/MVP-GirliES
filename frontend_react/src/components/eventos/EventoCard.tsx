import { CalendarDays, MapPin, Clock, CheckSquare, Square } from 'lucide-react';
import type { EventoGeral } from '../../services/api';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface EventoCardProps {
  evento: EventoGeral;
  onChecklistToggle?: (eventoId: number) => void;
}

const TIPO_CONFIG: Record<
  string,
  { label: string; dotClass: string; badgeClass: string; btnClass: string; btnLabel: string }
> = {
  Acolhida: {
    label: 'Próximo Destaque',
    dotClass: 'bg-emerald-400',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    btnClass: 'bg-girlies-purple hover:bg-[#3d004d] text-white shadow-md shadow-girlies-purple/20',
    btnLabel: 'Gerenciar Encontro',
  },
  'Oficina Prática': {
    label: 'Oficina Prática',
    dotClass: 'bg-violet-400',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
    btnClass: 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20',
    btnLabel: 'Detalhes da Oficina',
  },
  'Roda de Conversa': {
    label: 'Roda de Conversa',
    dotClass: 'bg-blue-400',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20',
    btnLabel: 'Gerenciar Painel',
  },
  'Mostra Científica': {
    label: 'Mostra Científica',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20',
    btnLabel: 'Ver Detalhes',
  },
  Outros: {
    label: 'Evento',
    dotClass: 'bg-slate-400',
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
    btnClass: 'bg-slate-600 hover:bg-slate-700 text-white shadow-md shadow-slate-500/20',
    btnLabel: 'Ver Detalhes',
  },
};

function formatarData(data: string): string {
  const d = new Date(data + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function EventoCard({ evento, onChecklistToggle }: EventoCardProps) {
  const config = TIPO_CONFIG[evento.tipoEvento] ?? TIPO_CONFIG['Outros'];

  const checklist = evento.logisticsChecklist ?? [];
  const totalItems = checklist.length;
  const completedItems = checklist.filter((item) => item.isCompleted).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const [localChecklist, setLocalChecklist] = useState(checklist);

  const handleToggle = async (itemId: number | undefined, index: number) => {
    if (itemId === undefined) return;
    // Optimistic update
    const updated = localChecklist.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setLocalChecklist(updated);
    try {
      await api.toggleChecklistItem(itemId);
      onChecklistToggle?.(evento.id);
    } catch (err) {
      // Revert on error
      setLocalChecklist(localChecklist);
      console.error('Erro ao atualizar checklist', err);
    }
  };

  const checklistLabel =
    evento.tipoEvento === 'Oficina Prática'
      ? 'Checklist do Laboratório'
      : evento.tipoEvento === 'Roda de Conversa'
      ? 'Trâmites Internos'
      : 'Checklist Interno';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
      {/* Card Body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Badge de tipo */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${config.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
            {config.label}
          </span>
        </div>

        {/* Título */}
        <h2 className="text-base font-extrabold text-slate-800 leading-snug -mt-1">
          {evento.titulo}
        </h2>

        {/* Metadados */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
            <CalendarDays className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <span>
              <span className="font-bold text-slate-700">{formatarData(evento.data)}</span>
              {evento.horarioInicio && (
                <span className="text-slate-500">
                  {' '}• {evento.horarioInicio}
                  {evento.horarioFim ? ` às ${evento.horarioFim}` : ''}
                </span>
              )}
            </span>
          </div>

          {evento.local && (
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{evento.local}</span>
            </div>
          )}

          {evento.regimeEvento && (
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="font-medium">{evento.regimeEvento}</span>
            </div>
          )}
        </div>

        {/* Checklist */}
        {localChecklist.length > 0 && (
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-500 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm border-2 border-slate-400 inline-block" />
                  {checklistLabel}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {progressPercent}%{' '}
                  <span className={progressPercent === 100 ? 'text-emerald-600' : 'text-girlies-purple'}>
                    Concluído ({completedItems}/{totalItems})
                  </span>
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    progressPercent === 100 ? 'bg-emerald-400' : 'bg-girlies-purple'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist items */}
            <ul className="flex flex-col gap-1.5">
              {localChecklist.slice(0, 4).map((item, index) => (
                <li key={item.id ?? index} className="flex items-center gap-2 group">
                  <button
                    onClick={() => handleToggle(item.id, index)}
                    className="flex-shrink-0 text-slate-400 hover:text-girlies-purple transition-colors"
                    title={item.isCompleted ? 'Desmarcar' : 'Marcar como concluído'}
                  >
                    {item.isCompleted ? (
                      <CheckSquare className="w-3.5 h-3.5 text-girlies-purple" />
                    ) : (
                      <Square className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span
                    className={`text-[11px] leading-tight transition-colors ${
                      item.isCompleted
                        ? 'text-slate-400 line-through'
                        : 'text-slate-600 group-hover:text-slate-800'
                    }`}
                  >
                    {item.descricao}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5">
        <Link
          to={`/eventos/${evento.id}`}
          className={`block w-full py-2 rounded-lg text-sm font-semibold transition-colors text-center ${config.btnClass}`}
        >
          {config.btnLabel}
        </Link>
      </div>
    </div>
  );
}
