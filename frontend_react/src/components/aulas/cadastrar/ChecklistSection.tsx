import { useState } from 'react';
import { CheckCircle2, ListTodo, Plus, PlusSquare } from 'lucide-react';
import { ChecklistItem as ChecklistItemComponent } from './ChecklistItem';
import { useAulaForm } from '../../../contexts/AulaFormContext';

export function ChecklistSection() {
  const { formData, updateField } = useAulaForm();
  const [novaTarefaTexto, setNovaTarefaTexto] = useState('');

  const tarefas = formData.checklist || [];
  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter(t => t.isCompleted).length;
  const porcentagem = totalTarefas === 0 ? 0 : Math.round((tarefasConcluidas / totalTarefas) * 100);

  const handleAddTarefa = () => {
    const textoTrimmed = novaTarefaTexto.trim();
    if (!textoTrimmed) return;

    const novaTarefa = {
      id: Date.now(), // Temporário
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
    <section className="bg-white rounded-2xl border border-slate-200 border-l-[6px] border-l-girlies-purple shadow-sm p-6 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-girlies-purple text-white flex items-center justify-center shadow-md shadow-girlies-purple/20">
            <ListTodo className="w-5 h-5" />
          </div>
          4. Checklist Operacional & Pré-Aula
        </h2>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            {tarefasConcluidas} de {totalTarefas} Concluídas
          </span>
          <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">Operação</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 ml-[52px] mb-6 font-medium">Tarefas essenciais de preparação com status em tempo real</p>

      <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden border border-slate-200">
        <div
          className="bg-emerald-400 h-full rounded-full shadow-inner transition-all duration-300"
          style={{ width: `${porcentagem}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {tarefas.map(tarefa => (
          <ChecklistItemComponent
            key={tarefa.id}
            id={String(tarefa.id)}
            texto={tarefa.descricao}
            concluida={tarefa.isCompleted}
            onToggle={handleToggleTarefa}
            onRemove={handleRemoveTarefa}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
        <div className="relative flex-1 w-full group">
          <PlusSquare className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
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
            placeholder="Adicionar nova tarefa personalizada ao checklist..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-transparent text-sm focus:outline-none focus:ring-0 text-slate-700 font-medium placeholder-slate-400"
          />
        </div>
        <button
          type="button"
          onClick={handleAddTarefa}
          className="bg-girlies-purple hover:bg-[#3d004d] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-girlies-purple/20 flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>
    </section>
  );
}
