import { Draggable } from '@hello-pangea/dnd';
import type { TaskCard, CardTag } from '../../contexts/InstagramContext';
import { Calendar, Clock, BarChart3, GripVertical, CheckSquare, Edit3 } from 'lucide-react';

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
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl p-4 mb-3 border border-slate-100 transition-all ${
            snapshot.isDragging ? 'shadow-xl scale-[1.02] rotate-1 ring-1 ring-girlies-purple/20' : 'shadow-sm hover:shadow-md'
          }`}
        >
          {/* Header (Tag & Edit Icon) */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getTagColor(task.tag)}`}>
                {task.tag}
              </span>
              {task.dueTime && task.tag !== 'Carrossel (8 slides)' && task.tag !== 'Post Divulgação' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.dueTime}
                </span>
              )}
              {task.tag === 'Post Divulgação' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  Evento Externo
                </span>
              )}
            </div>
            <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <GripVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Description */}
          <h3 className="text-slate-800 font-bold text-sm mb-1.5 leading-snug">{task.title}</h3>
          {task.description && (
            <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
              {task.description}
            </p>
          )}

          {/* Progress / Checklist */}
          {task.progressLabel && task.progressPercent !== undefined && (
            <div className="mb-3">
              <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-1">
                <span>{task.progressLabel}</span>
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

          {task.checklist && (
            <div className="mb-3 space-y-1.5">
              {task.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded flex items-center justify-center border ${item.checked ? 'bg-[#4b006e] border-[#4b006e]' : 'border-slate-300'}`}>
                    {item.checked && <CheckSquare className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={`text-[10px] font-medium ${item.strikethrough ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Special Labels (like Amanhã 18:00 for the carrossel) */}
          {task.tag === 'Carrossel (8 slides)' && task.dueTime && (
            <div className="flex justify-start mb-3">
               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.dueTime}
                </span>
            </div>
          )}

          {/* Footer (Date & Assignees) */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
            <div className="flex items-center gap-1.5 text-slate-500">
              {task.dueDate === 'Caruaru • PE' ? (
                <span className="flex items-center gap-1 text-[10px] font-medium">
                  📍 {task.dueDate}
                </span>
              ) : task.dueDate.includes('stickers') ? (
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                  <BarChart3 className="w-3.5 h-3.5" />
                  {task.dueDate}
                </span>
              ) : task.dueDate === 'Sugestão' ? (
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                  <BookOpenIcon className="w-3.5 h-3.5" />
                  {task.dueDate}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-medium">
                  <Calendar className="w-3 h-3" />
                  {task.dueDate}
                </span>
              )}

              {task.tag === 'Post Divulgação' && task.dueTime && (
                <>
                  <span className="text-[10px] text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-[10px] font-medium">
                    <Clock className="w-3 h-3" />
                    {task.dueTime}
                  </span>
                </>
              )}
            </div>

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
      )}
    </Draggable>
  );
}

// A simple icon fallback for BookOpen
function BookOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
