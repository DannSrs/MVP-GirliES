import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DropResult } from '@hello-pangea/dnd';

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
  checklist?: { id: number; descricao: string; isCompleted: boolean }[];
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
};

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

// --- Mock Data ---
const initialTasks: Record<string, TaskCard> = {
  'task-1': {
    id: 'task-1',
    tag: 'Stories',
    title: 'Diferença entre Frontend, Backend e Fullstack',
    description: 'Explicação didática com metáforas fáceis, código em Python/React e...',
    dueDate: '28/Set',
    assignees: [{ initial: 'C', name: 'Clara', color: 'bg-indigo-100 text-indigo-700' }],
  },
  'task-2': {
    id: 'task-2',
    tag: 'Reels / Vídeo Curto',
    title: 'Como foi a Acolhida das Calouras 2026.2',
    description: 'Montagem com takes dinâmicos dos kits de boas-vindas, dinâmicas de...',
    dueDate: '30/Set',
    assignees: [{ initial: 'L', name: 'Letícia', color: 'bg-girlies-purple text-white' }],
  },
  'task-3': {
    id: 'task-3',
    tag: 'Post Estático',
    title: 'Dica de Livro: Mulheres na Tecnologia',
    description: 'Recomendação de obras inspiradoras para a biblioteca comunitária do...',
    dueDate: 'Sugestão', // Representing suggestive state instead of exact date
    assignees: [{ initial: 'B', name: 'Beatriz', color: 'bg-emerald-100 text-emerald-700' }],
  },
  'task-4': {
    id: 'task-4',
    tag: 'Carrossel (8 slides)',
    title: 'O que é Engenharia de Software?',
    dueTime: 'Amanhã 18:00', // Em Produção special label
    dueDate: '28/Set',
    assignees: [
      { initial: 'L', name: 'Letícia', color: 'bg-girlies-purple text-white' },
      { initial: 'V', name: 'Vitória', color: 'bg-purple-900 text-white' }
    ],
    progressLabel: 'Design no Figma',
    progressPercent: 80,
    checklist: [
      { id: 1, descricao: 'Roteiro pedagógico aprovado', isCompleted: true },
      { id: 2, descricao: 'Mascotes pixel exportados', isCompleted: true },
      { id: 3, descricao: 'Revisão ortográfica final', isCompleted: false },
    ],
  },
  'task-5': {
    id: 'task-5',
    tag: 'Post Estático',
    title: 'Mulheres Históricas: Margaret Hamilton',
    description: 'A cientista que cunhou o termo Engenharia de Software e levou a...',
    dueDate: '28/Set',
    assignees: [{ initial: 'M', name: 'Maria Eduarda', color: 'bg-purple-100 text-purple-700' }],
    progressLabel: 'Status da Ilustração',
    progressPercent: 40,
  },
  'task-6': {
    id: 'task-6',
    tag: 'Reels / Vídeo Curto',
    title: 'Dia a Dia no Laboratório Maker IFPE',
    description: 'Bastidores de prototipagem, café gelado, resolução de bugs e...',
    dueDate: '28/Set',
    assignees: [{ initial: 'A', name: 'Ana Júlia', color: 'bg-indigo-200 text-indigo-800' }],
  },
  'task-7': {
    id: 'task-7',
    tag: 'Post Divulgação', // Also 'Evento Externo'
    title: 'REC\'n\'Play Caruaru 2026 – Convocação da Equipe',
    description: 'Chamada das estudantes para o maior festival de tecnologia do...',
    dueDate: 'Caruaru • PE', // using this slot for location for now
    dueTime: 'Sexta-feira • 12:00',
    assignees: [{ initial: 'C', name: 'Coordenação', color: 'bg-slate-500 text-white' }],
  },
  'task-8': {
    id: 'task-8',
    tag: 'Story Interativo',
    title: 'Quiz Rápido: Qual seu editor de código favorito?',
    description: 'Enquete nos stories (VS Code vs Neovim vs IntelliJ) com figurinhas...',
    dueDate: '4 stickers prontos',
    assignees: [{ initial: 'V', name: 'Vitória', color: 'bg-purple-900 text-white' }],
  }
};

const initialColumns: Record<string, ColumnData> = {
  'column-1': {
    id: 'column-1',
    title: 'Backlog / Ideias',
    taskIds: ['task-1', 'task-2', 'task-3'],
    colorClass: 'bg-purple-300',
  },
  'column-2': {
    id: 'column-2',
    title: 'Em Produção / Design',
    taskIds: ['task-4', 'task-5', 'task-6'],
    colorClass: 'bg-girlies-purple',
  },
  'column-3': {
    id: 'column-3',
    title: 'Pronto / Aprovado',
    taskIds: ['task-7', 'task-8'],
    colorClass: 'bg-emerald-400',
  },
};

const initialColumnOrder = ['column-1', 'column-2', 'column-3'];

export function InstagramProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(initialColumnOrder);

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
  };

  return (
    <InstagramContext.Provider value={{ tasks, columns, columnOrder, onDragEnd }}>
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
