import { Search, Terminal } from 'lucide-react';
import { AulasTableRow } from './AulasTableRow';
import type { PlanoAula } from '../../services/api';

interface AulasTableContainerProps {
  aulas: PlanoAula[];
}

export function AulasTableContainer({ aulas }: AulasTableContainerProps) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden min-h-[500px]">
      {/* Tabs & Search */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
          <button className="bg-girlies-purple text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md shadow-girlies-purple/20 whitespace-nowrap">Todas as Aulas ({aulas.length})</button>
          <button className="text-slate-500 hover:text-girlies-purple hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap border border-transparent hover:border-slate-200">Módulo 1: Lógica & Pensamento</button>
          <button className="text-slate-500 hover:text-girlies-purple hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap border border-transparent hover:border-slate-200">Módulo 2: Python Fundamentos</button>
          <button className="text-slate-500 hover:text-girlies-purple hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap border border-transparent hover:border-slate-200">Módulo 3: Projetos & Git</button>
        </div>
        <div className="relative flex-shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Buscar por tema ou monitora..." className="w-full xl:w-64 pl-9 pr-4 py-2 rounded-full border border-slate-200 text-xs text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20 transition-all" />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="min-w-[900px] border border-slate-200 rounded-xl overflow-hidden flex flex-col">
          {/* Table Title Bar */}
          <div className="bg-[#3d004d] text-white px-4 py-2.5 flex items-center justify-between text-[10px] font-mono tracking-widest font-semibold uppercase">
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              </span>
              SYLLABUS_SEMESTER_2026.2.SYS
            </div>
            <div className="flex items-center gap-2 opacity-80">
              Codando com Propósito <Terminal className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Table Header Columns */}
          <div className="grid grid-cols-[80px_2fr_1.5fr_1fr_1.5fr_120px_60px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div>Semana</div>
            <div>Tópico / Módulo</div>
            <div>Data & Horário</div>
            <div>Materiais</div>
            <div>Professora / Monitora</div>
            <div>Status</div>
            <div className="text-center">Ações</div>
          </div>

          {/* Table Rows List */}
          <div className="flex flex-col divide-y divide-slate-100 bg-white">
            {aulas.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">Nenhuma aula encontrada na API.</div>
            ) : (
              aulas.map((aula) => {
                const dataObj = new Date(aula.dataHora);
                const dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
                const horarioFormatado = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + 'h';
                
                return (
                  <AulasTableRow 
                    key={aula.id} 
                    semana={aula.semana?.toString().padStart(2, '0') || '00'}
                    tema={aula.titulo}
                    descricao={aula.descricao || 'Sem descrição'}
                    data={dataFormatada}
                    horario={horarioFormatado}
                    local={aula.local || 'Não definido'}
                    status={aula.status === 'done' || aula.status === 'in-progress' ? 'Confirmada' : 'Em Preparação'}
                    materiais={{ video: true, pdf: true }} // Mock por enquanto
                    professora={{ nome: "Profa. GirliES", cargo: "Docente", letra: "G" }} // Mock por enquanto
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 mt-auto">
        <span className="text-xs text-slate-500 font-medium">Mostrando <span className="text-slate-700 font-bold">{aulas.length}</span> de <span className="text-slate-700 font-bold">{aulas.length}</span> aulas cadastradas</span>
        <div className="flex gap-1.5">
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors disabled:opacity-50" disabled>Anterior</button>
          <button className="w-7 h-7 rounded-md bg-girlies-purple text-white text-xs font-bold flex items-center justify-center shadow-md shadow-girlies-purple/20">1</button>
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors disabled:opacity-50" disabled>Próxima</button>
        </div>
      </div>
    </section>
  );
}
