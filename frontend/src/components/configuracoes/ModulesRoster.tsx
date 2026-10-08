import { useState } from 'react';
import { Edit2, Trash2, BookOpen, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult, DragUpdate, DragStart } from '@hello-pangea/dnd';

export interface Modulo {
  id: number;
  nome: string;
}

interface ModulesRosterProps {
  modulos: Modulo[];
  onDelete: (id: number) => void;
  onEdit: (modulo: Modulo) => void;
  onAddClick: () => void;
  onReorder: (newModulos: Modulo[]) => void;
}

export function ModulesRoster({ modulos, onDelete, onEdit, onAddClick, onReorder }: ModulesRosterProps) {
  const [dragState, setDragState] = useState<{ sourceIndex: number, destinationIndex: number } | null>(null);

  const handleDragStart = (start: DragStart) => {
    setDragState({ sourceIndex: start.source.index, destinationIndex: start.source.index });
  };

  const handleDragUpdate = (update: DragUpdate) => {
    if (update.destination) {
      setDragState({ sourceIndex: update.source.index, destinationIndex: update.destination.index });
    } else {
      setDragState({ sourceIndex: update.source.index, destinationIndex: update.source.index });
    }
  };

  const getVisualIndex = (index: number) => {
    if (!dragState) return index + 1;
    const { sourceIndex, destinationIndex } = dragState;
  
    if (index === sourceIndex) return destinationIndex + 1;
    if (index < sourceIndex && index >= destinationIndex) return index + 2;
    if (index > sourceIndex && index <= destinationIndex) return index;
    return index + 1;
  };

  const handleDragEnd = (result: DropResult) => {
    setDragState(null);
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const newModulos = Array.from(modulos);
    const [reorderedItem] = newModulos.splice(result.source.index, 1);
    newModulos.splice(result.destination.index, 0, reorderedItem);

    onReorder(newModulos);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          Módulos Temáticos
        </h2>
        <button 
          onClick={onAddClick}
          className="bg-girlies-purple text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm shadow-girlies-purple/20 hover:bg-girlies-purple/90 transition-colors"
        >
          Novo Módulo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {modulos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center text-slate-500">
            <BookOpen className="w-12 h-12 text-slate-300 mb-3" />
            <p className="font-medium text-slate-600">Nenhum módulo cadastrado</p>
            <p className="text-sm mt-1">Clique em "Novo Módulo" para começar a organizar as aulas.</p>
          </div>
        ) : (
          <DragDropContext 
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
          >
            <Droppable droppableId="modulos-list">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="flex flex-col gap-3"
                >
                  {modulos.map((modulo, index) => (
                    <Draggable key={modulo.id.toString()} draggableId={modulo.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group relative bg-white border rounded-xl p-3 flex items-center justify-between transition-all
                            ${snapshot.isDragging ? 'border-girlies-purple shadow-lg ring-2 ring-girlies-purple/20' : 'border-slate-200 hover:border-girlies-purple/30 hover:shadow-md'}
                          `}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div 
                              {...provided.dragHandleProps}
                              className="p-1.5 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded cursor-grab active:cursor-grabbing transition-colors"
                              title="Arraste para reordenar"
                            >
                              <GripVertical className="w-5 h-5" />
                            </div>
                            
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-girlies-purple/10 group-hover:text-girlies-purple transition-colors">
                              {getVisualIndex(index)}
                            </div>
                            <h3 className="font-bold text-slate-800">{modulo.nome}</h3>
                          </div>

                          <div className={`flex items-center gap-1 transition-opacity ${snapshot.isDragging ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                            <button 
                              onClick={() => onEdit(modulo)}
                              className="p-2 text-slate-400 hover:text-girlies-purple hover:bg-girlies-purple/10 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => onDelete(modulo.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
