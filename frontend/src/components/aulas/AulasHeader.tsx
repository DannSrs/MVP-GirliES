import { Link } from 'react-router-dom';
import { Home, PlusCircle } from 'lucide-react';

export function AulasHeader() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 pt-7 pb-6 flex-shrink-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-girlies-purple/5 to-transparent pointer-events-none"></div>
      
      <div className="relative flex items-center gap-2 mb-4 font-mono text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Home className="w-3 h-3" />
          <Link to="/" className="hover:text-girlies-purple hover:underline">workspace</Link>
        </span>
        <span className="text-slate-300">&gt;</span>
        <a href="#" className="hover:text-girlies-purple hover:underline text-girlies-purple font-semibold">painel</a>
        <span className="text-slate-300">&gt;</span>
        <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded font-semibold">Semestre 2026.2</span>
      </div>
      
      <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-girlies-purple mb-1.5 flex items-center gap-2">
            Planejamento Pedagógico & Cronograma de Aulas
          </h1>
          <p className="text-sm text-slate-500">
            Curso Introdução à Engenharia de Software e Programação (Turma 2026.2) • Formando garotas que codam o futuro
          </p>
        </div>
        
        <Link 
          to="/aulas/cadastrar" 
          className="flex items-center justify-center gap-2 bg-girlies-purple hover:bg-[#3d004d] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-girlies-purple/20 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          Cadastrar Nova Aula
        </Link>
      </div>
    </section>
  );
}
