import React from 'react';
import { CheckCircle2, ListTodo, Plus, PlusSquare } from 'lucide-react';

export function ChecklistSection() {
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
          <span id="checklist-progress-text" className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            0 de 0 Concluídas
          </span>
          <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">Operação</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 ml-[52px] mb-6 font-medium">Tarefas essenciais de preparação com status em tempo real</p>

      <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden border border-slate-200">
        <div id="checklist-progress-bar" className="bg-emerald-400 h-full w-[0%] rounded-full shadow-inner transition-all duration-300"></div>
      </div>

      <div id="container-checklist" className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {/* Checklists dinâmicos */}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
        <div className="relative flex-1 w-full group">
          <PlusSquare className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
          <input type="text" id="nova-tarefa-input" placeholder="Adicionar nova tarefa personalizada ao checklist..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-transparent text-sm focus:outline-none focus:ring-0 text-slate-700 font-medium placeholder-slate-400" />
        </div>
        <button type="button" className="bg-girlies-purple hover:bg-[#3d004d] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-girlies-purple/20 flex items-center justify-center gap-2 w-full sm:w-auto flex-shrink-0">
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>
    </section>
  );
}
