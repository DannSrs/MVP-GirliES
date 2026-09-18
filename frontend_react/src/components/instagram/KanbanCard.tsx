import { Draggable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import type { TaskCard, CardTag } from '../../contexts/InstagramContext';
import { Calendar, Clock, GripVertical } from 'lucide-react';
import { useInstagram } from '../../contexts/InstagramContext';
import { MiniChecklist } from '../MiniChecklist';

interface KanbanCardProps {
  task: TaskCard;
  index: number;
}

const getTagColor = (tag: CardTag) => {
  switch (tag) {
    case 'Stories':
      return 'bg-purple-100 text-purple-700';
    case 'Reels / Vídeo Curto':
      return 'bg-pink-100 text-pink-700';
    case 'Post Estático':
      return 'bg-emerald-100 text-emerald-700';
    case 'Carrossel (8 slides)':
      return 'bg-indigo-100 text-indigo-700';
    case 'Post Divulgação':
      return 'bg-emerald-100 text-emerald-700';
    case 'Evento Externo':
      return 'bg-purple-100 text-purple-700';
    case 'Story Interativo':
      return 'bg-fuchsia-100 text-fuchsia-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export function KanbanCard({ task, index }: KanbanCardProps) {
  const { toggleChecklistItem } = useInstagram();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white rounded-xl mb-3 border border-slate-100 transition-all flex flex-col overflow-hidden ${
            snapshot.isDragging ? 'shadow-xl scale-[1.02] rotate-1 ring-1 ring-girlies-purple/20' : 'shadow-sm hover:shadow-md'
          }`}
        >
          {/* Drag Handle & Header Area */}
          <div 
            {...provided.dragHandleProps} 
            className="flex items-center justify-between p-3 border-b border-slate-50 cursor-grab active:cursor-grabbing bg-slate-50/30 hover:bg-slate-50 transition-colors"
          >
            <div className="flex gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getTagColor(task.tag)}`}>
                {task.tag}
              </span>
              {task.tag === 'Post Divulgação' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  Evento Externo
                </span>
              )}
            </div>
            <div className="text-slate-300 hover:text-slate-500 transition-colors">
              <GripVertical className="w-4 h-4" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title & Description */}
            <Link to={`/instagram/${task.id}`} className="group mb-1.5 flex items-start justify-between gap-2">
              <h3 className="text-slate-800 font-bold text-sm leading-snug group-hover:text-girlies-purple transition-colors">
                {task.title}
              </h3>
            </Link>
            {task.description && (
              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                {task.description}
              </p>
            )}

            {/* Progress Bar (if applicable and no checklist) */}
            {!task.checklist && task.progressPercent !== undefined && (
              <div className="mb-4">
                <div className="flex justify-end text-[10px] font-semibold text-slate-600 mb-1.5">
                  <span>{task.progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4b006e] rounded-full transition-all" 
                    style={{ width: `${task.progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Checklist */}
            {task.checklist && (
              <div className="mb-4">
                <MiniChecklist 
                  items={task.checklist}
                  onToggle={(itemId) => toggleChecklistItem(task.id, Number(itemId))}
                  showProgress={true}
                />
              </div>
            )}

            <div className="mt-auto">
              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  
                  {/* Reminder (if any) */}
                  {task.dueTime && (
                    <div className="flex items-center gap-1 w-fit bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{task.dueTime}</span>
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="flex items-center gap-1 text-[10px] font-medium">
                      <Calendar className="w-3 h-3" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>

                {/* Avatars */}
                <div className="flex -space-x-1.5">
                  {task.assignees.map((assignee, idx) => (
                    <div 
                      key={idx}
                      title={assignee.name}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-white shadow-sm ${assignee.color}`}
                    >
                      {assignee.initial}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}


