import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { api, type Usuario } from '../services/api';
import { ConfiguracoesHeader } from '../components/configuracoes/ConfiguracoesHeader';
import { ProfileSettings } from '../components/configuracoes/ProfileSettings';
import { TeamRoster } from '../components/configuracoes/TeamRoster';
import { MembraModal } from '../components/configuracoes/MembraModal';
import { ModulesRoster, type Modulo } from '../components/configuracoes/ModulesRoster';
import { ModuloModal } from '../components/configuracoes/ModuloModal';
import { useAuth } from '../contexts/AuthContext';

export function Configuracoes() {
  const { currentUser } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);

  // Tabs State
  const [activeTab, setActiveTab] = useState<'equipe' | 'modulos'>('equipe');

  // Modulos State
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [modulosLoading, setModulosLoading] = useState(false);
  const [isModuloModalOpen, setIsModuloModalOpen] = useState(false);
  const [moduloModalMode, setModuloModalMode] = useState<'create' | 'edit'>('create');
  const [editingModulo, setEditingModulo] = useState<Modulo | null>(null);
  const [deleteModuloId, setDeleteModuloId] = useState<number | null>(null);

  const loadUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadModulos = useCallback(async () => {
    try {
      setModulosLoading(true);
      const data = await api.getModulos();
      setModulos(data);
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
    } finally {
      setModulosLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsuarios();
    loadModulos();
  }, [loadUsuarios, loadModulos]);

  const handleDelete = (id: number) => {
    setDeleteModalId(id);
  };

  const confirmDelete = async () => {
    if (deleteModalId === null) return;
    try {
      await fetch(`/api/usuarios/${deleteModalId}`, { method: 'DELETE' });
      await loadUsuarios();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir membro.');
    } finally {
      setDeleteModalId(null);
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingUsuario(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (usuario: Usuario) => {
    setModalMode('edit');
    setEditingUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleSaveMembra = async (data: Omit<Usuario, 'id'>, id?: number) => {
    if (modalMode === 'create') {
      await api.criarUsuario(data);
    } else if (modalMode === 'edit' && id !== undefined) {
      await api.atualizarUsuario(id, data);
    }
    await loadUsuarios();
  };

  // Modulo Handlers
  const handleOpenCreateModulo = () => {
    setModuloModalMode('create');
    setEditingModulo(null);
    setIsModuloModalOpen(true);
  };

  const handleOpenEditModulo = (modulo: Modulo) => {
    setModuloModalMode('edit');
    setEditingModulo(modulo);
    setIsModuloModalOpen(true);
  };

  const handleDeleteModulo = (id: number) => {
    setDeleteModuloId(id);
  };

  const confirmDeleteModulo = async () => {
    if (deleteModuloId === null) return;
    try {
      await api.deletarModulo(deleteModuloId);
      await loadModulos();
    } catch (error) {
      console.error('Erro ao excluir módulo:', error);
      alert('Erro ao excluir módulo.');
    } finally {
      setDeleteModuloId(null);
    }
  };

  const handleSaveModulo = async (data: Omit<Modulo, 'id'>, id?: number) => {
    try {
      if (moduloModalMode === 'create') {
        await api.criarModulo(data);
      } else if (moduloModalMode === 'edit' && id !== undefined) {
        await api.atualizarModulo(id, data);
      }
      await loadModulos();
    } catch (error) {
      console.error('Erro ao salvar módulo:', error);
      alert('Erro ao salvar módulo.');
    }
  };

  const handleReorderModulos = async (newModulos: Modulo[]) => {
    setModulos(newModulos); // Optimistic UI update
    try {
      await api.reordenarModulos(newModulos.map(m => m.id));
    } catch (error) {
      console.error('Erro ao reordenar módulos:', error);
      await loadModulos(); // Rollback local state on error
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <ConfiguracoesHeader onAddClick={handleOpenCreate} />

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full flex-shrink-0">
        {/* Coluna Esquerda — Perfil (Fixa larg. no desktop) */}
        <div className="w-full xl:w-[22rem] flex-shrink-0">
          <ProfileSettings currentUser={currentUser || usuarios[0]} onProfileUpdate={loadUsuarios} />
        </div>

        {/* Coluna Direita — Roster */}
        <div className="flex-1 w-full min-w-0 flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('equipe')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'equipe' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Equipe
            </button>
            <button
              onClick={() => setActiveTab('modulos')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'modulos' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Módulos
            </button>
          </div>

          {activeTab === 'equipe' ? (
            loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 rounded-full border-4 border-girlies-purple border-t-transparent animate-spin" />
              </div>
            ) : (
              <TeamRoster 
                usuarios={usuarios}
                currentUser={currentUser || usuarios[0]}
                onDelete={handleDelete} 
                onEdit={handleOpenEdit}
              />
            )
          ) : modulosLoading ? (
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 rounded-full border-4 border-girlies-purple border-t-transparent animate-spin" />
            </div>
          ) : (
            <ModulesRoster 
              modulos={modulos}
              onDelete={handleDeleteModulo}
              onEdit={handleOpenEditModulo}
              onAddClick={handleOpenCreateModulo}
              onReorder={handleReorderModulos}
            />
          )}
        </div>
      </div>

      <MembraModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={editingUsuario}
        onSave={handleSaveMembra}
      />

      {/* Modal de Confirmação de Exclusão */}
      {deleteModalId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col gap-1 text-center">
              <div className="mx-auto w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Excluir Membra</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tem certeza que deseja excluir esta membra do sistema? Esta ação não pode ser desfeita.
              </p>
            </div>
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <ModuloModal
        isOpen={isModuloModalOpen}
        onClose={() => setIsModuloModalOpen(false)}
        mode={moduloModalMode}
        initialData={editingModulo}
        onSave={handleSaveModulo}
      />

      {/* Modal de Confirmação de Exclusão de Módulo */}
      {deleteModuloId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col gap-1 text-center">
              <div className="mx-auto w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Excluir Módulo</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tem certeza que deseja excluir este módulo? Se houver aulas vinculadas a ele, poderão ocorrer problemas de exibição.
              </p>
            </div>
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setDeleteModuloId(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteModulo}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
