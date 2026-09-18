import { Search } from 'lucide-react';

export type EventoFilter = 'todos' | 'proximos' | 'oficinas' | 'concluidos';

interface EventosFiltrosProps {
  activeFilter: EventoFilter;
  onFilterChange: (filter: EventoFilter) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  counts: {
    todos: number;
    proximos: number;
    oficinas: number;
    concluidos: number;
  };
}

export function EventosFiltros({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  counts,
}: EventosFiltrosProps) {
  const tabs: { key: EventoFilter; label: string }[] = [
    { key: 'todos', label: `Todos (${counts.todos})` },
    { key: 'proximos', label: `Próximos (${counts.proximos})` },
    { key: 'oficinas', label: `Oficinas Práticas (${counts.oficinas})` },
    { key: 'concluidos', label: `Concluídos (${counts.concluidos})` },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === tab.key
                ? 'bg-girlies-purple text-white shadow-md shadow-girlies-purple/25'
                : 'text-slate-500 hover:text-girlies-purple hover:bg-slate-50 border border-transparent hover:border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex-shrink-0">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filtrar por nome, cidade ou campus..."
          className="w-full sm:w-72 pl-9 pr-4 py-2 rounded-full border border-slate-200 text-xs text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20 transition-all"
        />
      </div>
    </div>
  );
}
