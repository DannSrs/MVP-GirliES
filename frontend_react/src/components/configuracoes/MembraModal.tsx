import { useState, useEffect } from 'react';
import { X, Save, UserCircle, Loader2 } from 'lucide-react';
import type { Usuario } from '../../../services/api';

interface MembraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Usuario, 'id'>, id?: number) => Promise<void>;
  initialData?: Usuario | null;
  mode: 'create' | 'edit';
}

export function MembraModal({ isOpen, onClose, onSave, initialData, mode }: MembraModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    funcaoInterna: '',
    curso: '',
    periodo: '',
    role: 'voluntaria' as 'voluntaria' | 'professora' | 'adm',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          nome: initialData.nome,
          email: initialData.email,
          funcaoInterna: initialData.funcaoInterna,
          curso: initialData.curso,
          periodo: initialData.periodo,
          role: initialData.role,
        });
      } else {
        setFormData({
          nome: '',
          email: '',
          funcaoInterna: '',
          curso: '',
          periodo: '',
          role: 'voluntaria',
        });
      }
      setError('');
    }
  }, [isOpen, initialData, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await onSave(formData, initialData?.id);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center">
              <UserCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {mode === 'create' ? 'Adicionar Nova Membra' : 'Editar Membra'}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {mode === 'create' ? 'WORKSPACE // ADD_MEMBER' : `EDIT_USER // ID: ${initialData?.id}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Nível de Acesso no Topo */}
          <div className="flex flex-col gap-1.5 mb-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">Nível de Acesso (Role) *</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'voluntaria' }))}
                disabled={mode === 'edit' && initialData?.role === 'adm'}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  formData.role === 'voluntaria'
                    ? 'border-girlies-purple bg-girlies-purple/10 text-girlies-purple'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-girlies-purple/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Voluntária
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'professora' }))}
                disabled={mode === 'edit' && initialData?.role === 'adm'}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  formData.role === 'professora'
                    ? 'border-girlies-purple bg-girlies-purple/10 text-girlies-purple'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-girlies-purple/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Professora
              </button>
            </div>
            {mode === 'edit' && initialData?.role === 'adm' && (
              <p className="text-[10px] text-red-500 mt-1 font-semibold">Admin Geral (Bloqueado para alteração)</p>
            )}
            {formData.role === 'adm' && initialData?.role === 'adm' && (
              <p className="text-[10px] text-girlies-purple mt-1 font-semibold">Atualmente com acesso Administrativo</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">Nome Completo *</label>
            <input
              required
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Beatriz Santos"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">E-mail Institucional *</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: aluna@discente.ifpe.edu.br"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">Curso *</label>
              <input
                required
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                placeholder="Ex: B.E.S."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">Período</label>
              <input
                name="periodo"
                value={formData.periodo}
                onChange={handleChange}
                placeholder="Ex: 4º Semestre"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">Função no Squad *</label>
            <input
              required
              name="funcaoInterna"
              value={formData.funcaoInterna}
              onChange={handleChange}
              placeholder="Ex: Monitora de Ensino • Trilha Python"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-girlies-purple focus:ring-1 focus:ring-girlies-purple transition-all"
            />
          </div>

          {/* Footer actions */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-girlies-purple hover:bg-[#3d004d] transition-colors shadow-md shadow-girlies-purple/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {mode === 'create' ? 'Salvar Nova Membra' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
