import { Draggable } from '@hello-pangea/dnd';
import type { TaskCard, CardTag } from '../../contexts/InstagramContext';
import { Calendar, Clock, BarChart3, GripVertical, Check } from 'lucide-react';


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
  // In a real scenario we would dispatch to context to toggle checklist items
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
            <h3 className="text-slate-800 font-bold text-sm mb-1.5 leading-snug">{task.title}</h3>
            {task.description && (
              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                {task.description}
              </p>
            )}

            {/* Progress Bar (if applicable) */}
            {task.progressLabel && task.progressPercent !== undefined && (
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
                {(() => {
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1.5">
                        {task.checklist.map(item => (
                          <div 
                            key={item.id} 
                            className="flex items-center gap-2 group cursor-default"
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${item.isCompleted ? 'bg-[#4b006e] border-[#4b006e]' : 'bg-white border border-slate-300'}`}>
                              {item.isCompleted && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                            </div>
                            <span className={`text-[11px] font-medium transition-colors line-clamp-1 ${item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                              {item.descricao}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
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

                  {/* Date/Location */}
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
