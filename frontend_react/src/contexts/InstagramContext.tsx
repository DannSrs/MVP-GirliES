import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { DropResult } from '@hello-pangea/dnd';
import { api } from '../services/api';
import type { PostInstagram, ChecklistItem, Usuario } from '../services/api';

export type Assignee = {
  initial: string;
  name: string;
  color: string; // Tailwind bg color class
};

export type CardTag = 
  | 'Stories' 
  | 'Reels / Vídeo Curto' 
  | 'Post Estático' 
  | 'Carrossel (8 slides)' 
  | 'Post Divulgação' 
  | 'Evento Externo' 
  | 'Story Interativo';

export type TaskCard = {
  id: string;
  title: string;
  description?: string;
  tag: CardTag;
  dueDate: string;
  dueTime?: string; // e.g., '18:00', 'Amanhã 18:00'
  assignees: Assignee[];
  progressLabel?: string;
  progressPercent?: number; // 0 to 100
  checklist?: ChecklistItem[];
  stickers?: string; // e.g., '4 stickers prontos'
};

export type ColumnData = {
  id: string;
  title: string;
  taskIds: string[];
  colorClass: string; // The dot color next to title
};

export type InstagramContextType = {
  tasks: Record<string, TaskCard>;
  columns: Record<string, ColumnData>;
  columnOrder: string[];
  onDragEnd: (result: DropResult) => void;
  toggleChecklistItem: (taskId: string, checklistId: number) => void;
  filterTag: string | null;
  setFilterTag: (tag: string | null) => void;
};

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

// Helper for generating deterministic avatars for backend users
const AVATAR_COLORS = [
  'bg-purple-100 text-purple-700',
  'bg-girlies-purple text-white',
  'bg-emerald-100 text-emerald-700',
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
  'bg-orange-100 text-orange-700'
];

function getAvatarForUser(id: number | undefined, users: Usuario[], roleName: string = 'User'): Assignee | null {
  if (!id) return null;
  const user = users.find(u => u.id === id);
  const colorIndex = id % AVATAR_COLORS.length;

  if (!user) {
    return {
      initial: roleName.charAt(0).toUpperCase(),
      name: `${roleName}: Removido`,
      color: AVATAR_COLORS[colorIndex]
    };
  }
  
  return {
    initial: user.nome.charAt(0).toUpperCase(),
    name: `${roleName}: ${user.nome}`,
    color: AVATAR_COLORS[colorIndex]
  };
}

function formatDate(isoString: string): string {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${d.getDate()}/${meses[d.getMonth()]}`;
}

function mapPostToTaskCard(post: PostInstagram, users: Usuario[]): TaskCard {
  const assignees: Assignee[] = [];
  const rot = getAvatarForUser(post.responsavelRoteiroId, users, 'Roteiro');
  if (rot) assignees.push(rot);
  
  const des = getAvatarForUser(post.responsavelDesignId, users, 'Design');
  if (des) assignees.push(des);

  // If no specific assignees, maybe add a fallback or leave empty. 
  // Let's leave empty if none assigned.

  let progressPercent: number | undefined = undefined;
  if (post.checklist && post.checklist.length > 0) {
    const completed = post.checklist.filter(c => c.isCompleted).length;
    progressPercent = Math.round((completed / post.checklist.length) * 100);
  }

  return {
    id: post.id.toString(),
    title: post.titulo,
    description: post.descricao,
    tag: post.tipoPost as CardTag,
    dueDate: formatDate(post.deadline),
    assignees,
    progressPercent,
    checklist: post.checklist
  };
}

const initialColumns: Record<string, ColumnData> = {
  'Backlog': {
    id: 'Backlog',
    title: 'Backlog',
    taskIds: [],
    colorClass: 'bg-purple-300',
  },
  'Produção': {
    id: 'Produção',
    title: 'Produção',
    taskIds: [],
    colorClass: 'bg-girlies-purple',
  },
  'Pronto': {
    id: 'Pronto',
    title: 'Pronto',
    taskIds: [],
    colorClass: 'bg-emerald-400',
  },
};

const initialColumnOrder = ['Backlog', 'Produção', 'Pronto'];

export function InstagramProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Record<string, TaskCard>>({});
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder] = useState(initialColumnOrder);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const [posts, users] = await Promise.all([
        api.getPosts(),
        api.getUsuarios()
      ]);
      
      const newTasks: Record<string, TaskCard> = {};
      const newColumns = JSON.parse(JSON.stringify(initialColumns)) as Record<string, ColumnData>;

      posts.forEach(post => {
        const task = mapPostToTaskCard(post, users);
        newTasks[task.id] = task;
        
        const colId = post.status || 'Backlog';
        if (newColumns[colId]) {
          newColumns[colId].taskIds.push(task.id);
        }
      });

      setTasks(newTasks);
      setColumns(newColumns);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Moving within the same list
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });

    // Update backend (Fire and forget, but could handle rollback on error)
    api.atualizarPost(draggableId, { status: destination.droppableId as any }).catch(err => {
      console.error('Erro ao atualizar status do post:', err);
      // Optional: reload posts here to revert state
      // fetchPosts();
    });
  };

  const toggleChecklistItem = (taskId: string, checklistId: number) => {
    setTasks(prevTasks => {
      const task = prevTasks[taskId];
      if (!task || !task.checklist) return prevTasks;

      const newChecklist = task.checklist.map(item => 
        item.id === checklistId 
          ? { ...item, isCompleted: !item.isCompleted } 
          : item
      );

      // Also update progressPercent based on completed items
      const completedCount = newChecklist.filter(item => item.isCompleted).length;
      const progressPercent = Math.round((completedCount / newChecklist.length) * 100);

      return {
        ...prevTasks,
        [taskId]: {
          ...task,
          checklist: newChecklist,
          progressPercent
        }
      };
    });

    // Sincroniza com backend (assumindo que api.toggleChecklistItem já existe para POST e AULA)
    // Se não existir o método de toggle específico, usaríamos um PUT de todo o array.
    // Aqui assumimos que ele altera globalmente
    if (typeof api.toggleChecklistItem === 'function') {
      api.toggleChecklistItem(checklistId).catch(err => console.error('Falha ao dar toggle no checklist', err));
    }
  };

  return (
    <InstagramContext.Provider value={{ tasks, columns, columnOrder, onDragEnd, toggleChecklistItem, filterTag, setFilterTag }}>
      {children}
    </InstagramContext.Provider>
  );
}

export function useInstagram() {
  const context = useContext(InstagramContext);
  if (context === undefined) {
    throw new Error('useInstagram must be used within a InstagramProvider');
  }
  return context;
}
