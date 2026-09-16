import { FolderOpen, MonitorPlay, ExternalLink, FileText, File, Download, Gamepad2, ClipboardList } from 'lucide-react';

export function MateriaisAnexos() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <FolderOpen className="w-5 h-5 text-girlies-purple" />
          Materiais Pedagógicos & Anexos
        </h2>
        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
          5 recursos ativos
        </span>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {/* Canva */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-girlies-purple/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center shadow-sm">
              <MonitorPlay className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 group-hover:text-girlies-purple transition-colors">Canva: Slides Interativos Semana 07 – POO Descomplicada</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">34 slides com diagramas visuais e analogias cotidianas</span>
            </div>
          </div>
          <button className="bg-white border border-slate-200 hover:border-girlies-purple text-slate-600 hover:text-girlies-purple text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider">
            Abrir Slides <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        
        {/* Notion */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Notion: Roteiro da Aula & Desafios em Duplas</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">Cronograma minuto a minuto, dinâmicas e critérios de mentoria</span>
            </div>
          </div>
          <button className="bg-white border border-slate-200 hover:border-slate-400 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider">
            Ver Roteiro <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* SUAP */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shadow-sm">
              <File className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">SUAP: Plano de Ensino Docente Aprovado (PDF)</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">Homologação institucional IFPE / Coordenação de Informática</span>
            </div>
          </div>
          <button className="bg-white border border-slate-200 hover:border-slate-400 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider">
            Download <Download className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {/* Kahoot & Google Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Kahoot */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-800">Kahoot: Quiz de Fixação</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">PIN: 489-0211</span>
            </div>
          </div>
          <button className="bg-girlies-purple hover:bg-[#3d004d] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
            Lançar
          </button>
        </div>
        
        {/* Google Forms */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-800">Google Forms: Feedback</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">Termômetro em tempo real</span>
            </div>
          </div>
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
            Acessar
          </button>
        </div>
      </div>
    </section>
  );
}
