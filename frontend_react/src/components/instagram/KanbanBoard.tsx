import { DragDropContext } from '@hello-pangea/dnd';
import { useInstagram } from '../../contexts/InstagramContext';
import { KanbanColumn } from './KanbanColumn';

export function KanbanBoard() {
  const { tasks, columns, columnOrder, onDragEnd } = useInstagram();

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden min-h-0 pb-2">
      <DragDropContext onDragEnd={onDragEnd}>  
         <div className="flex gap-6 h-full items-stretch min-w-max">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

            return (
              <div key={column.id} className="w-[340px] flex-shrink-0">
                <KanbanColumn column={column} tasks={columnTasks} />
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
