import { DragDropContext } from '@hello-pangea/dnd';
import { useInstagram } from '../../contexts/InstagramContext';
import { KanbanColumn } from './KanbanColumn';

export function KanbanBoard() {
  const { tasks, columns, columnOrder, onDragEnd } = useInstagram();

  return (
    <div className="flex-1 overflow-x-auto min-h-0">
      <DragDropContext onDragEnd={onDragEnd}>  
         <div className="flex gap-6 h-full items-start min-w-max pb-4">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

            return (
              <div key={column.id} className="w-[340px] h-[calc(100vh-280px)] min-h-[500px]">
                <KanbanColumn column={column} tasks={columnTasks} />
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
