import { CalendarDays, Clock } from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';

export function PostScheduleSection() {
  const { formData, updateField } = usePostForm();

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        Cronograma & Prazos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
            Data de Publicação
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-girlies-purple/50 focus:border-girlies-purple block p-3 pl-10 transition-colors outline-none font-medium"
              value={formData.data}
              onChange={(e) => updateField('data', e.target.value)}
            />
            <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
            Horário
          </label>
          <div className="relative">
            <input
              type="time"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-girlies-purple/50 focus:border-girlies-purple block p-3 pl-10 transition-colors outline-none font-medium"
              value={formData.horario}
              onChange={(e) => updateField('horario', e.target.value)}
            />
            <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
