import { useState } from 'react';
import { ClipboardList, Plus, Square, CheckSquare, Trash2 } from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';

export function PostChecklistSection() {
  const { formData, updateField } = usePostForm();
  const [novaTarefaTexto, setNovaTarefaTexto] = useState('');

  const tarefas = formData.checklist || [];
  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter(t => t.isCompleted).length;
  const porcentagem = totalTarefas === 0 ? 0 : Math.round((tarefasConcluidas / totalTarefas) * 100);

  const handleAddTarefa = () => {
    const textoTrimmed = novaTarefaTexto.trim();
    if (!textoTrimmed) return;

    const novaTarefa = {
      id: Date.now().toString(),
      descricao: textoTrimmed,
      isCompleted: false
    };

    updateField('checklist', [...tarefas, novaTarefa]);
    setNovaTarefaTexto('');
  };

  const handleToggleTarefa = (id: string | number) => {
    updateField('checklist', tarefas.map(t =>
      String(t.id) === String(id) ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const handleRemoveTarefa = (id: string | number) => {
    updateField('checklist', tarefas.filter(t => String(t.id) !== String(id)));
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ClipboardList className="w-4 h-4" />
          </div>
          4. Checklist de Tarefas
        </h2>
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-emerald-200">
          CHECKLIST
        </span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed -mt-1">
        Defina as tarefas essenciais que a equipe deve concluir antes da publicação do post:
      </p>

      {tarefas.length > 0 && (
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${porcentagem}%` }}
          />
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {tarefas.map((tarefa, index) => (
          <li
            key={tarefa.id}
            className="flex items-start gap-2.5 group"
          >
            <button
              type="button"
              onClick={() => handleToggleTarefa(tarefa.id)}
              className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-girlies-purple transition-colors"
            >
              {tarefa.isCompleted ? (
                <CheckSquare className="w-4 h-4 text-girlies-purple" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold leading-snug transition-colors ${tarefa.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {tarefa.descricao}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveTarefa(tarefa.id)}
              className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-slate-300 hover:text-red-400 transition-all mt-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={novaTarefaTexto}
          onChange={(e) => setNovaTarefaTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTarefa();
            }
          }}
          placeholder="Novo item para o checklist..."
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20 transition-all placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={handleAddTarefa}
          disabled={!novaTarefaTexto.trim()}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-girlies-purple/10 text-girlies-purple text-xs font-bold hover:bg-girlies-purple/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </button>
      </div>

      {tarefas.length > 0 && (
        <p className="text-[9px] font-mono text-slate-400 text-center">
          {tarefasConcluidas}/{totalTarefas} itens aprovados
        </p>
      )}
    </section>
  );
}
