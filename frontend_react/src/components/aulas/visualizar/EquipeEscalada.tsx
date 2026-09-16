import { Users } from 'lucide-react';

export function EquipeEscalada() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <Users className="w-5 h-5 text-girlies-purple" />
          Equipe Escalada
        </h2>
        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
          5 membros
        </span>
      </div>

      {/* Docentes */}
      <div className="mb-6">
        <h3 className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">Docentes Responsáveis</h3>
        <div className="flex flex-col gap-2.5">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3b0764] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border-2 border-white">
              VB
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Profa. Dra. Vitória Bezerra</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">Titular // Doutora em Eng. Software</span>
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border-2 border-white">
              HS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Dra. Heloísa Silva</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">Co-orientadora // Convidada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoras */}
      <div>
        <h3 className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">Monitoras & Apoio Técnico</h3>
        <div className="flex flex-col gap-2.5">
          
          {/* Monitora 1 */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-girlies-light text-girlies-purple flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                LS
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Leticia Silva</span>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5">Bolsista de Monitoria</span>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">Ativa</span>
          </div>
          
          {/* Monitora 2 */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                BS
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Beatriz Santos</span>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5">Voluntária GirliES</span>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">Ativa</span>
          </div>
          
          {/* Monitora 3 */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                CD
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Camila Duarte</span>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5">Apoio de Lab</span>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">Ativa</span>
          </div>
          
        </div>
      </div>
    </section>
  );
}
