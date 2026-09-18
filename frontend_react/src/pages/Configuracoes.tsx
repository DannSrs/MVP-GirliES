import { useState, useEffect, useCallback } from 'react';
import { api, type Usuario } from '../services/api';
import { ConfiguracoesHeader } from '../components/configuracoes/ConfiguracoesHeader';
import { ProfileSettings } from '../components/configuracoes/ProfileSettings';
import { TeamRoster } from '../components/configuracoes/TeamRoster';

export function Configuracoes() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadUsuarios();
  }, [loadUsuarios]);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta membra do sistema?')) {
      try {
        await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
        await loadUsuarios();
      } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Erro ao excluir membro.');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <ConfiguracoesHeader />

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full flex-shrink-0">
        {/* Coluna Esquerda — Perfil (Fixa larg. no desktop) */}
        <div className="w-full xl:w-[22rem] flex-shrink-0">
          <ProfileSettings />
        </div>

        {/* Coluna Direita — Roster */}
        <div className="flex-1 w-full min-w-0">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 rounded-full border-4 border-girlies-purple border-t-transparent animate-spin" />
            </div>
          ) : (
            <TeamRoster usuarios={usuarios} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
