import { Plus, UserPlus, Users } from 'lucide-react';

export function TeamSidebar() {
  return (
    <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-girlies-purple/10 text-girlies-purple flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            Equipe da Aula
          </h2>
          <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-slate-200">Docência</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
              Docentes Resp. <span id="count-docentes" className="bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">0</span>
            </h3>
            <div className="relative group">
              <button type="button" className="flex items-center gap-1.5 bg-girlies-purple/10 text-girlies-purple px-2 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-girlies-purple/20 transition-colors">
                Co-docência <UserPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div id="container-docentes" className="flex flex-col gap-2.5">
            {/* Docentes dinâmicos */}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
              Monitoras <span id="count-monitoras" className="bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">0</span>
            </h3>
            <div className="relative group">
              <button type="button" className="text-girlies-purple hover:text-[#3d004d] text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider hover:bg-girlies-purple/5 px-2 py-1 rounded transition-colors">
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
          </div>

          <div id="container-monitoras" className="flex flex-col gap-2.5">
            {/* Monitoras dinâmicas */}
          </div>
        </div>
      </div>
    </div>
  );
}
