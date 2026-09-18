import { useState, useEffect, useMemo, useCallback } from 'react';
import { api, type EventoGeral } from '../services/api';
import { EventosHeader } from '../components/eventos/EventosHeader';
import { EventosStats } from '../components/eventos/EventosStats';
import { EventosFiltros, type EventoFilter } from '../components/eventos/EventosFiltros';
import { EventosGrid } from '../components/eventos/EventosGrid';

export function Eventos() {
  const [eventos, setEventos] = useState<EventoGeral[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<EventoFilter>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const loadEventos = useCallback(async () => {
    try {
      const data = await api.getEventos();
      setEventos(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEventos();
  }, [loadEventos]);

  const hoje = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const filteredEventos = useMemo(() => {
    let result = [...eventos];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.titulo.toLowerCase().includes(term) ||
          (e.local ?? '').toLowerCase().includes(term) ||
          e.tipoEvento.toLowerCase().includes(term)
      );
    }

    switch (filter) {
      case 'proximos':
        result = result.filter((e) => new Date(e.data + 'T00:00:00') >= hoje);
        break;
      case 'oficinas':
        result = result.filter((e) => e.tipoEvento === 'Oficina Prática');
        break;
      case 'concluidos':
        result = result.filter((e) => new Date(e.data + 'T00:00:00') < hoje);
        break;
    }

    result.sort((a, b) => a.data.localeCompare(b.data));
    return result;
  }, [eventos, filter, searchTerm, hoje]);

  const counts = useMemo(() => {
    const proximos = eventos.filter((e) => new Date(e.data + 'T00:00:00') >= hoje).length;
    const oficinas = eventos.filter((e) => e.tipoEvento === 'Oficina Prática').length;
    const concluidos = eventos.filter((e) => new Date(e.data + 'T00:00:00') < hoje).length;
    return { todos: eventos.length, proximos, oficinas, concluidos };
  }, [eventos, hoje]);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <EventosHeader />

      <EventosStats eventos={eventos} />

      <EventosFiltros
        activeFilter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        counts={counts}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-400 text-sm">Carregando eventos...</p>
        </div>
      ) : (
        <EventosGrid eventos={filteredEventos} onRefresh={loadEventos} />
      )}
    </div>
  );
}
