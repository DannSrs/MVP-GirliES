import { Search, Terminal } from 'lucide-react';
import { AulasTableRow, type AulasTableRowProps } from './AulasTableRow';

const AULAS_DATA: AulasTableRowProps[] = [
  {
    semana: "01",
    tema: "Boas-vindas & Pensamento Computacional",
    descricao: "Dinâmicas em grupo, lógicas de blocos com Scratch e manifesto GirliES.",
    data: "09/Set",
    horario: "14h-17h",
    local: "Lab 04, Bloco D",
    materiais: { video: true, codigo: true, pdf: true },
    professora: {
      nome: "Profa. Vitória",
      cargo: "Docente IFPE",
      avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Vitoria&backgroundColor=e2e8f0"
    },
    status: "Confirmada"
  },
  {
    semana: "02",
    tema: "Sistemas Digitais & Circuitos Lógicos",
    descricao: "Portas AND/OR/NOT, bits, arquitetura simplificada e circuitos em protoboard.",
    data: "16/Set",
    horario: "14h-17h",
    local: "Lab Maker, IFPE",
    materiais: { video: true, pdf: true },
    professora: {
      nome: "Letícia Silva",
      cargo: "Dev // Infra",
      letra: "L"
    },
    status: "Confirmada"
  },
  {
    semana: "03",
    tema: "Introdução a Python & Variáveis",
    descricao: "Instalação de IDEs, tipos de dados (strings, inteiros), inputs e outputs no terminal.",
    data: "23/Set",
    horario: "14h-17h",
    local: "Lab 04, Bloco D",
    materiais: { video: true, codigo: true, pdf: true },
    professora: {
      nome: "Beatriz Souza",
      cargo: "Monitora Python",
      avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Beatriz&backgroundColor=e2e8f0"
    },
    status: "Confirmada",
    isPast: true
  },
  {
    semana: "04",
    tema: "Estruturas Condicionais & Loops",
    descricao: "Tomada de decisões com if/elif/else e repetições usando for e while no terminal.",
    data: "30/Set",
    horario: "14h-17h",
    local: "Lab 04, Bloco D",
    materiais: {},
    professora: {
      nome: "Camila Duarte",
      cargo: "Monitora Algoritmos",
      avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Camila&backgroundColor=e2e8f0"
    },
    status: "Em Preparação",
    isPast: true
  }
];

export function AulasTableContainer() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden min-h-[500px]">
      {/* Tabs & Search */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
          <button className="bg-girlies-purple text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md shadow-girlies-purple/20 whitespace-nowrap">Todas as Aulas (14)</button>
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
            {AULAS_DATA.map((aula) => (
              <AulasTableRow key={aula.semana} {...aula} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 mt-auto">
        <span className="text-xs text-slate-500 font-medium">Mostrando <span className="text-slate-700 font-bold">4</span> de <span className="text-slate-700 font-bold">14</span> aulas cadastradas</span>
        <div className="flex gap-1.5">
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors disabled:opacity-50" disabled>Anterior</button>
          <button className="w-7 h-7 rounded-md bg-girlies-purple text-white text-xs font-bold flex items-center justify-center shadow-md shadow-girlies-purple/20">1</button>
          <button className="w-7 h-7 rounded-md text-slate-600 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center transition-colors">2</button>
          <button className="w-7 h-7 rounded-md text-slate-600 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center transition-colors">3</button>
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-md transition-colors">Próxima</button>
        </div>
      </div>
    </section>
  );
}
