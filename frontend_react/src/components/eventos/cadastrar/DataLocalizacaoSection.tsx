import { CalendarDays, Link as LinkIcon, MapPin } from 'lucide-react';
import { useEventoForm } from '../../../contexts/EventoFormContext';

export function DataLocalizacaoSection() {
  const { formData, updateField } = useEventoForm();

  const decrementCapacidade = () => {
    if (formData.capacidade > 1) updateField('capacidade', formData.capacidade - 1);
  };

  const incrementCapacidade = () => {
    updateField('capacidade', formData.capacidade + 1);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <CalendarDays className="w-5 h-5" />
          </div>
          2. Data, Localização &amp; Capacidade
        </h2>
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">
          ETAPA 02
        </span>
      </div>

      {/* Data + Início + Término */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Data <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.data}
            onChange={(e) => updateField('data', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Início <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={formData.horarioInicio}
            onChange={(e) => updateField('horarioInicio', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Término <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={formData.horarioFim}
            onChange={(e) => updateField('horarioFim', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      {/* Espaço + Capacidade */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> Espaço no Campus IFPE
          </label>
          <input
            type="text"
            value={formData.espacoCampus}
            onChange={(e) => updateField('espacoCampus', e.target.value)}
            placeholder="Laboratório 04 (Bloco D - 1º Andar)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Capacidade
          </label>
          <div className="flex items-center gap-0 rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
            <button
              type="button"
              onClick={decrementCapacidade}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors text-lg font-bold flex-shrink-0"
            >
              −
            </button>
            <input
              type="number"
              value={formData.capacidade}
              onChange={(e) => updateField('capacidade', Math.max(1, Number(e.target.value)))}
              className="flex-1 text-center py-2 text-sm font-bold text-slate-700 bg-transparent focus:outline-none border-x border-slate-200"
              min={1}
            />
            <button
              type="button"
              onClick={incrementCapacidade}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors text-lg font-bold flex-shrink-0"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Link de Inscrição */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
          <LinkIcon className="w-3 h-3" /> Link de Inscrição Externa (Google Forms ou Sympla)
        </label>
        <div className="relative group">
          <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
          <input
            type="url"
            value={formData.linkInscricao}
            onChange={(e) => updateField('linkInscricao', e.target.value)}
            placeholder="https://forms.gle/girlies-ifpe-oficina-circuitos-2026"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white"
          />
        </div>
      </div>
    </section>
  );
}
