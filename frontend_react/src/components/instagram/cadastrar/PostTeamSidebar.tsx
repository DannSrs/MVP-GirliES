import { useState, useEffect } from 'react';
import { Plus, UserPlus, Users } from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';
import { api, type Usuario } from '../../../services/api';

export function PostTeamSidebar() {
  const { formData, updateField } = usePostForm();
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    api.getUsuarios()
      .then(data => setUsers(data))
      .catch(err => console.error('Erro ao carregar usuarios:', err));
  }, []);

  const getInitials = (idStr: string) => {
    if (!idStr) return '';
    const u = users.find(u => u.id.toString() === idStr);
    return u ? u.nome.charAt(0).toUpperCase() : '?';
  };

  const getName = (idStr: string) => {
    if (!idStr) return '';
    const u = users.find(u => u.id.toString() === idStr);
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
            Atribuições
          </h2>
          <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-slate-200">Equipe</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
              Redação / Roteiro <span className="bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">{formData.redacao ? '1' : '0'}</span>
            </h3>
            <div className="relative group">
              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={formData.redacao}
                onChange={(e) => updateField('redacao', e.target.value)}
              >
                <option value="">Nenhum</option>
                {users.map(member => (
                  <option key={`redacao-${member.id}`} value={member.id.toString()}>{member.nome}</option>
                ))}
              </select>
              <button type="button" className="flex items-center gap-1.5 bg-girlies-purple/10 text-girlies-purple px-2 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider hover:bg-girlies-purple/20 transition-colors pointer-events-none">
                {formData.redacao ? 'Alterar' : 'Atribuir'} <UserPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {formData.redacao && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold">
                  {getInitials(formData.redacao)}
                </div>
                <span className="text-xs font-medium text-slate-700">{getName(formData.redacao)}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
              Design / Foto <span className="bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">{formData.designer ? '1' : '0'}</span>
            </h3>
            <div className="relative group">
              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={formData.designer}
                onChange={(e) => updateField('designer', e.target.value)}
              >
                <option value="">Nenhum</option>
                {users.map(member => (
                  <option key={`designer-${member.id}`} value={member.id.toString()}>{member.nome}</option>
                ))}
              </select>
              <button type="button" className="text-girlies-purple hover:text-[#3d004d] text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider hover:bg-girlies-purple/5 px-2 py-1 rounded transition-colors pointer-events-none">
                <Plus className="w-3 h-3" /> {formData.designer ? 'Alterar' : 'Adicionar'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {formData.designer && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">
                  {getInitials(formData.designer)}
                </div>
                <span className="text-xs font-medium text-slate-700">{getName(formData.designer)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
