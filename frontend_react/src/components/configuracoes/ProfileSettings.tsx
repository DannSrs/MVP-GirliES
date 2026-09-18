import { useState, useEffect } from 'react';
import { MonitorPlay, Save, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { type Usuario, api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileSettingsProps {
  currentUser?: Usuario;
  onProfileUpdate?: () => void;
}

export function ProfileSettings({ currentUser, onProfileUpdate }: ProfileSettingsProps) {
  const { updateProfile } = useAuth();

  const getRoleConfig = (role: string, name: string) => {
    switch (role) {
      case 'adm':
        return { label: 'Admin Geral', badgeClass: 'bg-purple-900 text-white', access: 'Acesso Total' };
      case 'professora':
        return { label: 'Coordenação', badgeClass: 'bg-violet-100 text-violet-700 border-violet-200', access: 'Acesso Total' };
      case 'voluntaria':
      default:
        if (name.includes('Beatriz')) return { label: 'Monitora', badgeClass: 'bg-indigo-100 text-indigo-700', access: 'Editora Aulas' };
        if (name.includes('Maria Eduarda')) return { label: 'Social Media', badgeClass: 'bg-pink-100 text-pink-700', access: 'Midias & Post' };
        if (name.includes('Clara')) return { label: 'Design & Arte', badgeClass: 'bg-purple-100 text-purple-700', access: 'Assets UI' };
        if (name.includes('Ana Júlia')) return { label: 'Monitora Maker', badgeClass: 'bg-fuchsia-100 text-fuchsia-700', access: 'Editora Labs' };
        return { label: 'Voluntária', badgeClass: 'bg-blue-100 text-blue-700 border-blue-200', access: 'Editora Aulas' };
    }
  };

  const [formData, setFormData] = useState<Partial<Usuario>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<{ show: boolean, type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        nome: currentUser.nome,
        email: currentUser.email,
        curso: currentUser.curso === 'Não Informado' ? '' : currentUser.curso,
        periodo: currentUser.periodo === 'Não Informado' ? '' : currentUser.periodo,
        funcaoInterna: currentUser.funcaoInterna,
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!currentUser) return;
    try {
      setIsSaving(true);
      
      const dataToSave = {
        ...formData,
        curso: formData.curso?.trim() || 'Não Informado',
        periodo: formData.periodo?.trim() || 'Não Informado',
      };

      await api.atualizarUsuario(currentUser.id, dataToSave);
      
      // Atualiza o contexto global se for o próprio perfil logado sendo editado
      updateProfile({ ...currentUser, ...dataToSave } as Usuario);

      if (onProfileUpdate) onProfileUpdate();
      setFeedbackModal({ show: true, type: 'success', message: 'Seu perfil foi atualizado com sucesso!' });
    } catch (e) {
      setFeedbackModal({ show: true, type: 'error', message: 'Ocorreu um erro ao tentar salvar as alterações.' });
    } finally {
      setIsSaving(false);
    }
  };

  const roleCfg = currentUser ? getRoleConfig(currentUser.role, currentUser.nome) : null;
  const initial = currentUser ? currentUser.nome[0].toUpperCase() : 'U';

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5">
      {/* Header do perfil */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">
            PROFILE.CFG
          </span>
        </div>
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-emerald-200">
          ONLINE
        </span>
      </div>

      {currentUser ? (
        <>
          {/* Info principal com Avatar Letra */}
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl font-extrabold shadow-md flex-shrink-0 relative ${currentUser.role === 'adm' ? 'bg-gradient-to-br from-girlies-purple to-violet-400' : 'bg-violet-500'}`}>
              {initial}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                <MonitorPlay className="w-3.5 h-3.5 text-girlies-purple" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-800">{currentUser.nome}</h2>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider uppercase border border-transparent ${roleCfg?.badgeClass}`}>
                  {roleCfg?.label}
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 font-semibold mb-1">
                {roleCfg?.access}
              </p>
              <p className="text-xs text-girlies-purple font-medium">
                {currentUser.curso}
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Formulário estático */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
                  Nome Completo
                </label>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Público</span>
              </div>
              <input
                type="text"
                name="nome"
                value={formData.nome || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
                E-mail Institucional
              </label>
              <input
                type="text"
                name="email"
                value={formData.email || ''}
                disabled
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-400 bg-slate-50 outline-none cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider truncate">
                  Curso
                </label>
                <input
                  type="text"
                  name="curso"
                  value={formData.curso || ''}
                  onChange={handleChange}
                  placeholder="Não Informado"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider truncate">
                  Período
                </label>
                <input
                  type="text"
                  name="periodo"
                  value={formData.periodo || ''}
                  onChange={handleChange}
                  placeholder="Não Informado"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
                Função Interna no Squad
              </label>
              <input
                type="text"
                name="funcaoInterna"
                value={formData.funcaoInterna || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-girlies-purple hover:bg-[#3d004d] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-girlies-purple/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-slate-500">Nenhum usuário selecionado.</p>
        </div>
      )}

      {/* Modal de Feedback */}
      {feedbackModal?.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col gap-1 text-center">
              <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${feedbackModal.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                {feedbackModal.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                {feedbackModal.type === 'success' ? 'Sucesso!' : 'Atenção'}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feedbackModal.message}
              </p>
            </div>
            
            <button
              onClick={() => setFeedbackModal(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors mt-2"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
