import { Calendar } from 'lucide-react';
import { EventoCard } from './EventoCard';
import type { EventoGeral } from '../../services/api';

interface EventosGridProps {
  eventos: EventoGeral[];
  onRefresh: () => void;
}

export function EventosGrid({ eventos, onRefresh }: EventosGridProps) {
  if (eventos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-girlies-purple/10 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-girlies-purple/50" />
        </div>
        <div className="text-center">
          <p className="text-slate-700 font-bold text-base mb-1">Nenhum evento encontrado</p>
          <p className="text-slate-400 text-sm">
            Tente ajustar os filtros ou cadastre um novo evento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {eventos.map((evento) => (
        <EventoCard
          key={evento.id}
          evento={evento}
          onChecklistToggle={onRefresh}
        />
      ))}
    </div>
  );
}
