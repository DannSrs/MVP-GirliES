import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, type PlanoAula, type Usuario } from '../services/api';
import { VisualizarAulaHeader } from '../components/aulas/visualizar/VisualizarAulaHeader';
import { TerminalHeroCard } from '../components/aulas/visualizar/TerminalHeroCard';
import { ChecklistOperacional } from '../components/aulas/visualizar/ChecklistOperacional';
import { MateriaisAnexos } from '../components/aulas/visualizar/MateriaisAnexos';
import { EquipeEscalada } from '../components/aulas/visualizar/EquipeEscalada';

export function VisualizarAula() {
  const { id } = useParams();
  const [aula, setAula] = useState<PlanoAula | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        if (id && id !== 'visualizar') {
          const [aulasData, usuariosData] = await Promise.all([
            api.getAulas(),
            api.getUsuarios()
          ]);
          
          const found = aulasData.find(a => a.id === Number(id));
          if (found) setAula(found);
          setUsuarios(usuariosData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col h-full pr-2 pb-6 relative items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-girlies-purple border-t-transparent animate-spin mb-4"></div>
        <p className="text-slate-400 font-mono text-sm">Carregando aula {id}...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <VisualizarAulaHeader aula={aula || undefined} />
      
      <TerminalHeroCard aula={aula || undefined} />

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full flex-shrink-0">
        
        {/* Left Column (Checklist & Materiais) */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <ChecklistOperacional aula={aula || undefined} />
          <MateriaisAnexos aula={aula || undefined} />
        </div>

        {/* Right Column (Equipe) */}
        <div className="w-full xl:w-[22rem] flex flex-col gap-6">
          <EquipeEscalada aula={aula || undefined} usuarios={usuarios} />
        </div>
        
      </div>
    </div>
  );
}
