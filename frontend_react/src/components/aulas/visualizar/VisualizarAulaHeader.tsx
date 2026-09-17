import { ArrowLeft, GraduationCap, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PlanoAula } from '../../../services/api';

interface VisualizarAulaHeaderProps {
  aula?: PlanoAula;
}

export function VisualizarAulaHeader({ aula }: VisualizarAulaHeaderProps) {
  const semanaStr = aula?.semana ? String(aula.semana).padStart(2, '0') : '00';
  const statusAula = aula?.status || 'Em Preparação';

  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'Confirmada': return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500 animate-pulse' };
      case 'Concluída': return { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' };
      case 'Cancelada': return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' };
      default: return { bg: 'bg-girlies-purple/10', text: 'text-girlies-purple', dot: 'bg-girlies-purple' };
    }
  };

  const style = getStatusStyle(statusAula);

  return (
    <header className="flex flex-col gap-5 mb-6 sticky top-0 bg-[#f8f9fa]/90 backdrop-blur-md pt-2 pb-4 z-20 border-b border-transparent flex-shrink-0">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
        <GraduationCap className="w-3.5 h-3.5" /> IFPE 
        <span className="text-slate-300">/</span>
        <span className="text-slate-600">GirliES</span>
        <span className="text-slate-300">/</span>
        <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded-full font-bold tracking-wider">● Semestre 2026.2</span>
      </div>

      {/* Botões e Título/Tag */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Link to="/aulas" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-semibold text-[11px] transition-all px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Cronograma de Aulas
          </Link>
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider ${style.bg} ${style.text}`}>
            <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
            {statusAula}
          </div>
        </div>
        
        {aula?.id && (
          <Link to={`/aulas/${aula.id}/editar`} className="flex items-center gap-2 text-slate-800 hover:text-girlies-purple font-bold text-[10px] transition-all px-4 py-2 rounded-2xl bg-[#f4f2f6] hover:bg-girlies-purple/10 leading-tight">
            <Edit className="w-4 h-4 text-girlies-purple" />
            <div className="flex flex-col text-left">
              <span>Editar</span>
              <span>Aula</span>
            </div>
          </Link>
        )}
      </div>
      
      {/* Subtexto da semana */}
      <div className="flex mt-[-4px]">
        <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-1 rounded font-mono text-[9px] font-bold uppercase tracking-widest">
          SEMANA {semanaStr} // 2026.2
        </span>
      </div>
    </header>
  );
}
