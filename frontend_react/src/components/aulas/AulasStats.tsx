import { Calendar, Clock, Users, HeartHandshake } from 'lucide-react';

export interface AulasStatsProps {
  semanasTotais: number;
  cargaHorariaTotal: number;
  alunasMatriculadas?: number;
  monitorasVoluntarias?: number;
}

export function AulasStats({ 
  semanasTotais, 
  cargaHorariaTotal, 
  alunasMatriculadas = 28, 
  monitorasVoluntarias = 8 
}: AulasStatsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover-card cursor-default">
        <div className="w-12 h-12 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center flex-shrink-0">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-slate-800 leading-none">{semanasTotais}</span>
          <span className="text-xs text-slate-500 font-medium mt-1">Semanas Totais</span>
        </div>
      </div>
      
      {/* Card 2 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover-card cursor-default">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-slate-800 leading-none">{cargaHorariaTotal}h</span>
          <span className="text-xs text-slate-500 font-medium mt-1">Carga Horária Total</span>
        </div>
      </div>
      
      {/* Card 3 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover-card cursor-default">
        <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-slate-800 leading-none">{alunasMatriculadas}</span>
          <span className="text-xs text-slate-500 font-medium mt-1">Alunas Matriculadas</span>
        </div>
      </div>
      
      {/* Card 4 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover-card cursor-default">
        <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-slate-800 leading-none">{monitorasVoluntarias}</span>
          <span className="text-xs text-slate-500 font-medium mt-1">Monitoras Voluntárias</span>
        </div>
      </div>
    </section>
  );
}
