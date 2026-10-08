import { useState } from 'react';
import { ClipboardList, Plus, Square, CheckSquare, Trash2 } from 'lucide-react';

export interface GenericChecklistItem {
  id?: string | number;
  descricao: string;
  isCompleted: boolean;
}

export interface GenericChecklistSectionProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  items: GenericChecklistItem[];
  onAdd: (descricao: string) => void;
  onToggle: (idOrIndex: any) => void;
  onRemove: (idOrIndex: any) => void;
  itemIdentifier?: 'id' | 'index'; // Indicates how we identify items in callbacks
}

export function GenericChecklistSection({
  title,
  description,
  items,
  onAdd,
  onToggle,
  onRemove,
  itemIdentifier = 'id'
}: GenericChecklistSectionProps) {
  const [novoItemTexto, setNovoItemTexto] = useState('');

  const totalItems = items.length;
  const itensConcluidos = items.filter(t => t.isCompleted).length;
  const porcentagem = totalItems === 0 ? 0 : Math.round((itensConcluidos / totalItems) * 100);

  const handleAdd = () => {
    const textoTrimmed = novoItemTexto.trim();
    if (!textoTrimmed) return;

    onAdd(textoTrimmed);
    setNovoItemTexto('');
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ClipboardList className="w-4 h-4" />
          </div>
          {title}
        </h2>
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-emerald-200">
          CHECKLIST
        </span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
        {description}
      </p>

      {items.length > 0 && (
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${porcentagem}%` }}
          />
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {items.map((item, index) => {
          const identifier = itemIdentifier === 'id' ? item.id : index;
          return (
            <li
              key={item.id || index}
              className="flex items-start gap-2.5 group"
            >
              <button
                type="button"
                onClick={() => onToggle(identifier)}
                className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-girlies-purple transition-colors"
              >
                {item.isCompleted ? (
                  <CheckSquare className="w-4 h-4 text-girlies-purple" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold leading-snug transition-colors ${item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {item.descricao}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(identifier)}
                className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-slate-300 hover:text-red-400 transition-all mt-0.5"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={novoItemTexto}
          onChange={(e) => setNovoItemTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Novo item para o checklist..."
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20 transition-all placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!novoItemTexto.trim()}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-girlies-purple/10 text-girlies-purple text-xs font-bold hover:bg-girlies-purple/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </button>
      </div>

      {items.length > 0 && (
        <p className="text-[9px] font-mono text-slate-400 text-center">
          {itensConcluidos}/{totalItems} itens aprovados
        </p>
      )}
    </section>
  );
}
