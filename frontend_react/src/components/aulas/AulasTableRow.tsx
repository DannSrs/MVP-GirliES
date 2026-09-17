import { CalendarDays, MapPin, MonitorPlay, FileText, File, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AulasTableRowProps {
  id?: number;
  semana: string;
  tema: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  materiais: {
    linkSlide?: string;
    linkRoteiro?: string;
    linkPlanoAula?: string;
  };
  professora: {
    nome: string;
    cargo: string;
    avatarUrl?: string;
    letra?: string;
  };
  status: 'Confirmada' | 'Em Preparação';
  timeStatus: 'past' | 'current' | 'future';
}

export function AulasTableRow(props: AulasTableRowProps) {
  const {
    semana,
    tema,
    descricao,
    data,
    horario,
    local,
    materiais,
    professora,
    status,
    id,
    timeStatus
  } = props;

  let weekBadgeClass = "";
  let weekTextSem = "";
  let weekTextNum = "";
  let rowClass = "grid grid-cols-[80px_2fr_1.5fr_1fr_1.5fr_120px_60px] gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors";

  if (timeStatus === 'current') {
    weekBadgeClass = "bg-girlies-purple shadow-md shadow-girlies-purple/20";
    weekTextSem = "text-white text-[9px] font-bold leading-none";
    weekTextNum = "text-white text-xs font-bold leading-none mt-0.5";
  } else if (timeStatus === 'past') {
    weekBadgeClass = "bg-girlies-purple/10 shadow-sm shadow-girlies-purple/5";
    weekTextSem = "text-girlies-purple text-[9px] font-bold leading-none";
    weekTextNum = "text-girlies-purple text-xs font-bold leading-none mt-0.5";
  } else {
    weekBadgeClass = "bg-slate-100 border border-slate-200";
    weekTextSem = "text-slate-400 text-[9px] font-bold leading-none";
    weekTextNum = "text-slate-500 text-xs font-bold leading-none mt-0.5";
  }

  const hasMateriais = !!(materiais?.linkSlide || materiais?.linkRoteiro || materiais?.linkPlanoAula);

  return (
    <div className={rowClass}>
      {/* Col 1 */}
      <div>
        <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center ${weekBadgeClass}`}>
          <span className={weekTextSem}>Sem</span>
          <span className={weekTextNum}>{semana}</span>
        </div>
      </div>
      
      {/* Col 2 */}
      <div className="pr-4">
        <h3 className="text-sm font-bold text-slate-800 leading-snug mb-1">{tema}</h3>
        <p className="text-[11px] text-slate-500 leading-tight">{descricao}</p>
      </div>
      
      {/* Col 3 */}
      <div>
        <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium mb-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
          {data} • {horario}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {local}
        </div>
      </div>
      
      {/* Col 4 */}
      <div className="flex items-center gap-1.5">
        {!hasMateriais ? (
          <span className="text-[10px] text-slate-400 font-medium italic flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Em edição
          </span>
        ) : (
          <>
            {materiais?.linkSlide && (
              <a href={materiais.linkSlide} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-md bg-girlies-purple/5 border border-girlies-purple/10 flex items-center justify-center text-girlies-purple cursor-pointer hover:bg-girlies-purple/10 transition-colors" title="Apresentação de Slides">
                <MonitorPlay className="w-3.5 h-3.5" />
              </a>
            )}
            {materiais?.linkRoteiro && (
              <a href={materiais.linkRoteiro} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-md bg-girlies-purple/5 border border-girlies-purple/10 flex items-center justify-center text-girlies-purple cursor-pointer hover:bg-girlies-purple/10 transition-colors" title="Roteiro da Aula">
                <FileText className="w-3.5 h-3.5" />
              </a>
            )}
            {materiais?.linkPlanoAula && (
              <a href={materiais.linkPlanoAula} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-md bg-girlies-purple/5 border border-girlies-purple/10 flex items-center justify-center text-girlies-purple cursor-pointer hover:bg-girlies-purple/10 transition-colors" title="Plano de Ensino">
                <File className="w-3.5 h-3.5" />
              </a>
            )}
          </>
        )}
      </div>
      
      {/* Col 5 */}
      <div className="flex items-center gap-3">
        {professora.avatarUrl ? (
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
            <img src={professora.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-girlies-purple text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            {professora.letra}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-700 truncate">{professora.nome}</p>
          <p className="text-[10px] text-slate-400 truncate">{professora.cargo}</p>
        </div>
      </div>
      
      {/* Col 6 */}
      <div>
        {status === 'Confirmada' ? (
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmada
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-girlies-purple/10 text-girlies-purple px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-girlies-purple"></span> Em Preparação
          </span>
        )}
      </div>
      
      {/* Col 7: Actions */}
      <div className="flex items-center gap-1">
        <Link to={`/aulas/${id || 'visualizar'}`} className="w-8 h-8 rounded-md bg-transparent border border-transparent flex items-center justify-center text-slate-400 hover:bg-white hover:text-girlies-purple hover:border-girlies-purple/30 hover:shadow-sm cursor-pointer transition-all" title="Visualizar Aula">
          <Eye className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
