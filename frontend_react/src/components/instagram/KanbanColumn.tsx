import { Droppable } from '@hello-pangea/dnd';
import type { ColumnData, TaskCard } from '../../contexts/InstagramContext';
import { KanbanCard } from './KanbanCard';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  column: ColumnData;
  tasks: TaskCard[];
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  // Mock WIP limits based on Figma
  const getBadgeText = () => {
    if (column.id === 'column-2') return `${tasks.length} WIP`;
    if (column.id === 'column-3') return `${tasks.length} Na Fila`;
    return tasks.length;
  };

  const getBadgeClass = () => {
    if (column.id === 'column-2') return 'bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full text-[10px]';
    if (column.id === 'column-3') return 'bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]';
    return 'bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full text-[10px]';
  };

  return (
    <div className="flex flex-col bg-slate-50/50 rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm h-full max-h-full">
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200/50">
        <div className="flex items-center gap-2.5">
          <div className={`w-3 h-3 rounded-full ${column.colorClass}`} />
          <h2 className="text-lg font-bold text-slate-800">{column.title}</h2>
          <span className={getBadgeClass()}>
            {getBadgeText()}
          </span>
        </div>
        
        {column.id === 'column-1' && (
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-200 rounded-md">
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 overflow-y-auto min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-purple-50/50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
