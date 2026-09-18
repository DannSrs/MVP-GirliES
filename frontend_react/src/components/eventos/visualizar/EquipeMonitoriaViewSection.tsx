import { Users } from 'lucide-react';
import type { EventoGeral } from '../../../services/api';

interface EquipeMonitoriaViewSectionProps {
  evento?: EventoGeral;
}

// Monitoras mock fiéis ao mockup
const MONITORAS_MOCK = [
  { nome: 'Letícia Silva', papel: 'Líder das Bancadas 1 e 2 (LEDs & Sensores)', letra: 'LS', cor: 'bg-violet-500' },
  { nome: 'Clara Albuquerque', papel: 'Líder das Bancadas 3 e 4 (Buzzers & Som)', letra: 'CA', cor: 'bg-blue-500' },
  { nome: 'Ana Júlia Correia', papel: 'Recepção, Credenciamento & Kits', letra: 'AJ', cor: 'bg-emerald-500' },
  { nome: 'Beatriz Santos', papel: 'Apoio Audiovisual, Som & Registros Fotográficos', letra: 'BS', cor: 'bg-pink-500' },
];

export function EquipeMonitoriaViewSection({ evento }: EquipeMonitoriaViewSectionProps) {
  const totalIntegrantes = MONITORAS_MOCK.length + 1; // +1 professora

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <Users className="w-5 h-5 text-girlies-purple" />
          Equipe &amp; Monitoria
        </h2>
        <span className="text-[10px] font-mono text-slate-400 font-bold">
          Docência Orientadora • Monitoras GirliES
          <span className="ml-2 bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded font-bold">
            {totalIntegrantes} integrantes
          </span>
        </span>
      </div>

      {/* Professora */}
      <div>
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4">
          <div className="w-10 h-10 rounded-full bg-girlies-purple text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0">
            VB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-700">Profa. Vitória Bezerra</p>
            <p className="text-[10px] text-slate-400 font-mono">Docente Orientadora // IFPE</p>
          </div>
          <span className="bg-girlies-purple text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0">
            Coordenação
          </span>
        </div>

        {/* Label */}
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">
          MONITORAS VOLUNTÁRIAS DA TURMA
        </p>

        {/* Monitoras */}
        <div className="flex flex-col gap-3">
          {MONITORAS_MOCK.map((m) => (
            <div key={m.nome} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${m.cor} text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0`}>
                {m.letra}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700">{m.nome}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{m.papel}</p>
              </div>
              {/* Dot online */}
              <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" title="Ativa" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer card */}
      <div className="bg-girlies-purple/5 rounded-xl p-3 border border-girlies-purple/10">
        <p className="text-[10px] text-girlies-purple font-mono font-bold text-center">
          GirliES Squad • Turma 2026.2 // {totalIntegrantes} Voluntárias
        </p>
      </div>
    </section>
  );
}
