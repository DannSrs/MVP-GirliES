import { CalendarDays, MapPin, MonitorPlay, FileText, File, Eye, Clock, ChevronDown, Trash2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../services/api';
import { Modal } from '../Modal';

export interface AulasTableRowProps {
  id?: number;
  semana: string;
  tema: string;
  descricao?: string;
  categoria?: string;
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
  status: string;
  timeStatus: 'past' | 'current' | 'future';
}

export function AulasTableRow(props: AulasTableRowProps) {
  const {
    semana,
    tema,
    descricao,
    categoria,
    data,
    horario,
    local,
    materiais,
    professora,
    status,
    id,
    timeStatus
  } = props;

  const [localStatus, setLocalStatus] = useState(status || 'Em Preparação');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleDropdown = () => {
    if (!isStatusDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const handleStatusChange = async (newStatus: string) => {
    setLocalStatus(newStatus);
    if (id) {
      try {
        await api.updateAulaStatus(id, newStatus);
      } catch (error) {
        console.error('Erro ao atualizar status', error);
      }
    }
  };

  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'Confirmada': return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500/20';
      case 'Concluída': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:ring-emerald-500/20';
      case 'Cancelada': return 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500/20';
      default: return 'bg-girlies-purple/10 text-girlies-purple hover:bg-girlies-purple/20 focus:ring-girlies-purple/20';
    }
  };

  const handleDeleteAula = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (id) {
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await api.deletarAula(id);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir aula', error);
      alert('Erro ao excluir a aula.');
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

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
  const moduloShort = categoria ? categoria.split(':')[0].trim() : 'Módulo ?';

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
        <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2" title={tema}>
          {tema} / {moduloShort}
        </h3>
        <p className={`text-[11px] leading-tight mt-1 ${descricao ? 'text-slate-500' : 'text-slate-400 italic'}`}>
          {descricao || 'Sem descrição'}
        </p>
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
        <button
          ref={buttonRef}
          onClick={handleToggleDropdown}
          onBlur={() => setTimeout(() => setIsStatusDropdownOpen(false), 200)}
          className={`inline-flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-transparent transition-all outline-none focus:ring-2 focus:ring-offset-1 w-[130px] ${getStatusStyle(localStatus)}`}
        >
          <span className="truncate">{localStatus}</span>
          <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isStatusDropdownOpen && createPortal(
          <div 
            className="absolute bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 py-1 z-[9999] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            style={{ 
              top: dropdownPos.top + 4, 
              left: dropdownPos.left,
              width: Math.max(140, dropdownPos.width)
            }}
          >
            {['Em Preparação', 'Confirmada', 'Concluída', 'Cancelada'].map((opt) => (
              <button
                key={opt}
                onMouseDown={(e) => {
                  e.preventDefault(); // Impede que o onBlur do botão principal dispare antes do clique
                  handleStatusChange(opt);
                  setIsStatusDropdownOpen(false);
                }}
                className={`text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  localStatus === opt
                    ? 'bg-slate-50 text-slate-800'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>,
          document.body
        )}
      </div>
      
      {/* Col 7: Actions */}
      <div className="flex items-center gap-1">
        <Link to={`/aulas/${id || 'visualizar'}`} className="w-8 h-8 rounded-md bg-transparent border border-transparent flex items-center justify-center text-slate-400 hover:bg-white hover:text-girlies-purple hover:border-girlies-purple/30 hover:shadow-sm cursor-pointer transition-all" title="Visualizar Aula">
          <Eye className="w-4 h-4" />
        </Link>
        {id && (
          <button 
            onClick={handleDeleteAula}
            className="w-8 h-8 rounded-md bg-transparent border border-transparent flex items-center justify-center text-slate-400 hover:bg-white hover:text-red-500 hover:border-red-200 hover:shadow-sm cursor-pointer transition-all" 
            title="Excluir Aula"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
        title="Excluir Aula"
        icon={<AlertTriangle className="w-5 h-5" />}
        iconBgClass="bg-red-100 text-red-600"
      >
        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-600">
              Tem certeza que deseja excluir a aula <strong className="text-slate-800">{tema}</strong>?
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Esta ação não pode ser desfeita e todos os dados associados serão perdidos.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-sm shadow-red-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? 'Excluindo...' : 'Sim, excluir aula'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
