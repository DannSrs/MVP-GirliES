import { Draggable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import type { TaskCard, CardTag } from '../../contexts/InstagramContext';
import { Calendar, Clock, GripVertical, Trash2, Maximize2, AlertTriangle } from 'lucide-react';
import { useInstagram } from '../../contexts/InstagramContext';
import { MiniChecklist } from '../MiniChecklist';
import { Modal } from '../Modal';
import { useState } from 'react';
import { api } from '../../services/api';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      // The task.id in KanbanCard is usually a string from the DND context, but corresponds to the Post ID
      // If the ID contains prefix (e.g. from dnd), make sure it's the right ID. 
      // Actually, task.id is just the id string. Let's pass it.
      await api.deletarPost(task.id);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir post', error);
      alert('Erro ao excluir o post.');
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
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
            <div className="flex items-center gap-1.5 text-slate-300">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsDeleteModalOpen(true); }}
                className="hover:text-red-500 transition-colors"
                title="Excluir Post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <GripVertical className="w-4 h-4 hover:text-slate-500 transition-colors" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title & Description */}
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <h3 className="text-slate-800 font-bold text-sm leading-snug">
                {task.title}
              </h3>
            </div>
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
              <div className="flex justify-end mb-2 px-1">
                <Link to={`/instagram/${task.id}`} className="text-slate-300 hover:text-girlies-purple transition-colors" title="Visualizar Post">
                  <Maximize2 className="w-4 h-4" />
                </Link>
              </div>
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
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border-2 border-white shadow-sm cursor-default select-none ${assignee.color}`}
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
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
      title="Excluir Post"
      icon={<AlertTriangle className="w-5 h-5" />}
      iconBgClass="bg-red-100 text-red-600"
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-600">
            Tem certeza que deseja excluir o post <strong className="text-slate-800">{task.title}</strong>?
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Esta ação não pode ser desfeita e todos os dados associados serão perdidos.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-sm shadow-red-500/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? 'Excluindo...' : 'Sim, excluir post'}
          </button>
        </div>
      </div>
    </Modal>
    </>
  );
}


