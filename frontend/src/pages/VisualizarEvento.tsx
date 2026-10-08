import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, type EventoGeral } from '../services/api';
import { VisualizarEventoHeader } from '../components/eventos/visualizar/VisualizarEventoHeader';
import { EventoHeroCard } from '../components/eventos/visualizar/EventoHeroCard';
import { LogisticaApoioSection } from '../components/eventos/visualizar/LogisticaApoioSection';
import { EquipeMonitoriaViewSection } from '../components/eventos/visualizar/EquipeMonitoriaViewSection';

export function VisualizarEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState<EventoGeral | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvento() {
      try {
        setLoading(true);
        const eventos = await api.getEventos();
        const found = eventos.find((e) => e.id === Number(id));
        if (found) setEvento(found);
      } catch (error) {
        console.error('Erro ao carregar evento:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEvento();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full gap-4">
        <div className="w-8 h-8 rounded-full border-4 border-girlies-purple border-t-transparent animate-spin" />
        <p className="text-slate-400 font-mono text-sm">Carregando evento {id}...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 relative">
      <VisualizarEventoHeader evento={evento ?? undefined} />

      <EventoHeroCard evento={evento ?? undefined} />

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full flex-shrink-0">
        {/* Coluna Esquerda — Logística */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <LogisticaApoioSection evento={evento ?? undefined} />
        </div>

        {/* Coluna Direita — Equipe */}
        <div className="w-full xl:w-[22rem] flex flex-col gap-6 flex-shrink-0">
          <EquipeMonitoriaViewSection evento={evento ?? undefined} />
        </div>
      </div>
    </div>
  );
}
