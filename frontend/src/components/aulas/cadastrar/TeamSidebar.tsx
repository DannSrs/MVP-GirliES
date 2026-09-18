import { useState, useEffect } from 'react';
import { Plus, UserPlus, Users, X } from 'lucide-react';
import { useAulaForm } from '../../../contexts/AulaFormContext';
import { api, type Usuario } from '../../../services/api';

export function TeamSidebar() {
  const { formData, updateField } = useAulaForm();
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    api.getUsuarios().then(setUsers).catch(console.error);
  }, []);

  const docentes = users.filter(u => u.role === 'professora' || u.role === 'adm');
  const monitoras = users.filter(u => u.role === 'voluntaria');

  const selectedDocentes = formData.responsaveisId.filter(id => docentes.some(d => d.id === id));
  const selectedMonitoras = formData.responsaveisId.filter(id => monitoras.some(m => m.id === id));

  const handleToggleResponsavel = (id: number) => {
    if (formData.responsaveisId.includes(id)) {
      updateField('responsaveisId', formData.responsaveisId.filter(rId => rId !== id));
    } else {
      updateField('responsaveisId', [...formData.responsaveisId, id]);
    }
  };

  const getUserInitials = (id: number) => {
    const u = users.find(u => u.id === id);
    return u ? u.nome.charAt(0).toUpperCase() : '?';
  };
  
  const getUserName = (id: number) => {
    const u = users.find(u => u.id === id);
    return u ? u.nome : 'Desconhecido';
  };

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

        {/* Docentes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
              Docentes Resp. <span className="bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">{selectedDocentes.length}</span>
            </h3>
            <div className="relative group">
              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value=""
                onChange={(e) => {
                  if (e.target.value) handleToggleResponsavel(Number(e.target.value));
                }}
              >
                <option value="">Selecione...</option>
                {docentes.filter(d => !selectedDocentes.includes(d.id)).map(d => (
                  <option key={d.id} value={d.id}>{d.nome}</option>
                ))}
              </select>
              <button type="button" className="flex items-center gap-1.5 bg-girlies-purple/10 text-girlies-purple px-2 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-girlies-purple/20 transition-colors pointer-events-none">
                Co-docência <UserPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {selectedDocentes.map(id => (
              <div key={id} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold select-none">
                    {getUserInitials(id)}
                  </div>
                  <span className="text-xs font-medium text-slate-700">{getUserName(id)}</span>
                </div>
                <button type="button" onClick={() => handleToggleResponsavel(id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedDocentes.length === 0 && <span className="text-xs text-slate-400 italic">Nenhum docente.</span>}
          </div>
        </div>

        {/* Monitoras */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
              Monitoras <span className="bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">{selectedMonitoras.length}</span>
            </h3>
            <div className="relative group">
              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value=""
                onChange={(e) => {
                  if (e.target.value) handleToggleResponsavel(Number(e.target.value));
                }}
              >
                <option value="">Selecione...</option>
                {monitoras.filter(m => !selectedMonitoras.includes(m.id)).map(m => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
              <button type="button" className="text-girlies-purple hover:text-[#3d004d] text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider hover:bg-girlies-purple/5 px-2 py-1 rounded transition-colors pointer-events-none">
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {selectedMonitoras.map(id => (
              <div key={id} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold select-none">
                    {getUserInitials(id)}
                  </div>
                  <span className="text-xs font-medium text-slate-700">{getUserName(id)}</span>
                </div>
                <button type="button" onClick={() => handleToggleResponsavel(id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedMonitoras.length === 0 && <span className="text-xs text-slate-400 italic">Nenhuma monitora.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
