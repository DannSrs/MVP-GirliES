import { Trash2 } from 'lucide-react';

interface ChecklistItemProps {
  id: string;
  texto: string;
  concluida: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ChecklistItem({ id, texto, concluida, onToggle, onRemove }: ChecklistItemProps) {
  return (
    <label className="bg-white border border-slate-200 hover:border-girlies-purple/30 rounded-xl p-3.5 flex gap-3.5 items-start cursor-pointer transition-all group shadow-sm relative pr-10">
      <input
        type="checkbox"
        checked={concluida}
        onChange={() => onToggle(id)}
        className="mt-0.5 w-4 h-4 text-girlies-purple rounded border-slate-300 focus:ring-girlies-purple accent-girlies-purple cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold transition-colors break-words ${concluida ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-girlies-purple'}`}>
          {texto}
        </p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onRemove(id);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </label>
  );
}
