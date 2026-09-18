import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function CadastrarPostHeader() {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link 
            to="/instagram" 
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-girlies-purple hover:text-white transition-colors cursor-pointer mr-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <span className="bg-purple-100 text-girlies-purple text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            INSTA LAB • IFPE
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 uppercase tracking-wider">
            Novo Pipeline
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Nova Ideia de Post</h1>
        <p className="text-slate-500 text-sm mt-1">
          Preencha os dados do post para adicioná-lo ao fluxo do Kanban.
        </p>
      </div>
    </div>
  );
}
