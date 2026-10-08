import { Calendar, CalendarDays, ChevronDown } from 'lucide-react';
import { useAulaForm } from '../../../contexts/AulaFormContext';

export function LogisticsSection() {
  const { formData, updateField } = useAulaForm();

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
            <CalendarDays className="w-5 h-5" />
          </div>
          2. Logística, Data & Local
        </h2>
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">Etapa 02</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Data da Aula
          </label>
          <div className="relative group">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
            <input
              type="date"
              value={formData.dataHora}
              onChange={(e) => updateField('dataHora', e.target.value)}
              max="9999-12-31"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.blur();
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Espaço / Lab IFPE
          </label>
          <div className="relative group">
            <select
              value={formData.local}
              onChange={(e) => updateField('local', e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all appearance-none text-slate-700 font-medium bg-slate-50 focus:bg-white cursor-pointer"
            >
              <option value="Lab 04 - Bloco D (Linux/VS Code)">Lab 04 - Bloco D (Linux/VS Code)</option>
              <option value="Lab Maker (Hardware)">Lab Maker (Hardware)</option>
              <option value="Auditório">Auditório</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-girlies-purple transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
