import { ArrowLeft, BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CadastrarAulaHeader() {
  return (
    <header className="flex flex-col gap-4 mb-6 sticky top-0 bg-slate-50/90 backdrop-blur-md pt-2 pb-4 z-10 border-b border-transparent">
      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
        <Link to="/" className="hover:text-girlies-purple transition-colors">Workspace</Link>
        <span className="text-slate-300">/</span>
        <Link to="/" className="hover:text-girlies-purple transition-colors">Painel</Link>
        <span className="text-slate-300">/</span>
        <Link to="/aulas" className="hover:text-girlies-purple transition-colors">Aulas</Link>
        <span className="text-slate-300">/</span>
        <span className="text-girlies-purple font-bold">Cadastrar Nova Aula</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-girlies-purple tracking-tight">Cadastrar Nova Aula</h1>
          <div className="flex items-center gap-1.5 bg-girlies-purple/10 text-girlies-purple px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider border border-girlies-purple/20">
            <BookOpenCheck className="w-3.5 h-3.5" />
            Turma 2026.2 // Módulos Pedagógicos
          </div>
        </div>
        <Link to="/aulas" className="flex items-center gap-2 text-slate-600 hover:text-girlies-purple hover:bg-girlies-purple/5 font-semibold text-sm transition-all px-4 py-2 rounded-xl border border-slate-200 hover:border-girlies-purple/30 bg-white shadow-sm">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Cronograma
        </Link>
      </div>
    </header>
  );
}
