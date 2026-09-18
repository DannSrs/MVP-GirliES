import { Check, CheckCircle2, Circle } from 'lucide-react';

export interface ChecklistItemType {
  id: string | number;
  descricao: string;
  isCompleted: boolean;
}

interface MiniChecklistProps {
  items: ChecklistItemType[];
  onToggle: (id: number | string) => void;
  showProgress?: boolean;
  variant?: 'default' | 'circle';
}

export function MiniChecklist({ items, onToggle, showProgress, variant = 'default' }: MiniChecklistProps) {
  if (!items || items.length === 0) return null;

  const completedCount = items.filter(i => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Progress Bar (if applicable) */}
      {showProgress && (
        <div className="mb-1">
          <div className="flex justify-end text-[10px] font-semibold text-slate-600 mb-1.5">
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4b006e] rounded-full transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-1.5">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`flex items-start gap-2 cursor-pointer select-none group rounded-md transition-colors ${variant === 'circle' ? 'px-1 py-0.5 -mx-1 hover:bg-slate-50' : ''}`}
            onClick={() => onToggle(item.id)}
          >
            {variant === 'default' ? (
              <div className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${item.isCompleted ? 'bg-[#4b006e] border-[#4b006e]' : 'bg-white border border-slate-300'}`}>
                {item.isCompleted && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
              </div>
            ) : (
              item.isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
              )
            )}
            
            <span className={`text-[11px] font-medium transition-colors leading-snug ${item.isCompleted ? 'text-slate-400 line-through' : (variant === 'default' ? 'text-slate-600 group-hover:text-[#4b006e]' : 'text-slate-600')}`}>
              {item.descricao}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
