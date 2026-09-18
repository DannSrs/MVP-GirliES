import { BookOpen } from 'lucide-react';
import { useEventoForm } from '../../../contexts/EventoFormContext';

const TIPOS_EVENTO = [
  { value: 'Acolhida & Recepção', label: 'Acolhida & Recepção' },
  { value: 'Oficina Prática (Lab)', label: 'Oficina Prática (Lab)' },
  { value: 'Roda de Conversa & Carreira', label: 'Roda de Conversa & Carreira' },
  { value: 'Mostra Científica', label: 'Mostra Científica' },
];

const REGIMES = [
  'Presencial (Campus IFPE)',
  'Online (Plataforma GirliES)',
  'Híbrido',
];

export function DetalhesGeraisSection() {
  const { formData, updateField } = useEventoForm();

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          1. Detalhes Gerais do Encontro
        </h2>
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">
          ETAPA 01
        </span>
      </div>

      {/* Nome do Evento */}
      <div className="flex flex-col gap-1.5 mb-5">
        <div className="flex justify-between items-end">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Nome do Evento / Atividade <span className="text-red-500">*</span>
          </label>
        </div>
        <input
          type="text"
          value={formData.titulo}
          onChange={(e) => updateField('titulo', e.target.value)}
          placeholder="Oficina Prática: Prototipando Circuitos e Robótica Básica"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white"
        />
      </div>

      {/* Tipo de Evento — Radio Buttons */}
      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
          Tipo de Evento
        </label>
        <div className="grid grid-cols-2 gap-3">
          {TIPOS_EVENTO.map((tipo) => {
            const isSelected = formData.tipoEvento === tipo.value;
            return (
              <label
                key={tipo.value}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-girlies-purple bg-girlies-purple text-white shadow-md shadow-girlies-purple/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-girlies-purple/40 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-white' : 'border-slate-400'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
                <input
                  type="radio"
                  name="tipoEvento"
                  value={tipo.value}
                  checked={isSelected}
                  onChange={() => updateField('tipoEvento', tipo.value)}
                  className="sr-only"
                />
                <span className="text-sm font-semibold leading-tight">{tipo.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Regime da Atividade */}
      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
          Regime da Atividade
        </label>
        <div className="relative group">
          <select
            value={formData.regimeEvento}
            onChange={(e) => updateField('regimeEvento', e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all appearance-none text-slate-700 font-medium bg-slate-50 focus:bg-white cursor-pointer"
          >
            {REGIMES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <svg className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </div>

      {/* Resumo & Objetivo */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
          Resumo &amp; Objetivo do Encontro
        </label>
        <textarea
          rows={5}
          value={formData.resumo}
          onChange={(e) => updateField('resumo', e.target.value)}
          placeholder="Uma tarde prática acolhedora dedicada a introduzir os conceitos de sensores, jumpers e microcontroladores amigáveis. Cada caloura contará com o apoio individual de monitoras do GirliES para construir seu primeiro circuito interativo com LEDs e sons."
          className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all resize-none text-slate-700 font-medium bg-slate-50 focus:bg-white"
        />
      </div>
    </section>
  );
}
