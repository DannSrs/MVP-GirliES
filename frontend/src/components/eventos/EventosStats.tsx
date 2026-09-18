import { CalendarDays, CheckCircle2 } from 'lucide-react';
import type { EventoGeral } from '../../services/api';

interface EventosStatsProps {
  eventos: EventoGeral[];
}

export function EventosStats({ eventos }: EventosStatsProps) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const agendados = eventos.filter((e) => {
    const dataEvento = new Date(e.data);
    dataEvento.setHours(0, 0, 0, 0);
    return dataEvento >= hoje;
  }).length;

  const realizadas = eventos.filter((e) => {
    const dataEvento = new Date(e.data);
    dataEvento.setHours(0, 0, 0, 0);
    return dataEvento < hoje;
  }).length;

  return (
    <section className="flex gap-4 flex-shrink-0">
      {/* Card — Agendados */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 hover-card cursor-default flex-1">
        <div className="w-12 h-12 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center flex-shrink-0">
          <CalendarDays className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-slate-800 leading-none">{agendados}</span>
          <span className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">
            Eventos no Semestre
          </span>
        </div>
      </div>

      {/* Card — Realizadas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4 hover-card cursor-default flex-1">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-extrabold text-slate-800 leading-none">{realizadas}</span>
          <span className="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">
            Oficinas Concluídas
          </span>
        </div>
      </div>
    </section>
  );
}
