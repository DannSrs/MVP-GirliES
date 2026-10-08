import { useState, useEffect } from 'react';
import { CheckSquare, Check, CheckCircle2 } from 'lucide-react';
import { api, type PlanoAula, type ChecklistItem } from '../../../services/api';
import confetti from 'canvas-confetti';

interface ChecklistOperacionalProps {
  aula?: PlanoAula;
}

export function ChecklistOperacional({ aula }: ChecklistOperacionalProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);

  // Inicializa os items a partir dos dados da aula
  useEffect(() => {
    if (aula?.checklist) {
      setItems(aula.checklist);
    } else {
      // Mock de fallback caso não venha do back-end
      setItems([
        { id: 1, descricao: 'Testar computadores e ambiente Python 3.12 + VS Code nas 18 bancadas', isCompleted: true },
        { id: 2, descricao: 'Retirada das chaves do Lab 04 com a portaria do Bloco D', isCompleted: true },
        { id: 3, descricao: 'Impressão de 36 listas de presença e crachás com pronomes', isCompleted: true },
        { id: 4, descricao: 'Postar lembrete no Instagram e canal #avisos do Discord', isCompleted: true },
        { id: 5, descricao: 'Validar cabo HDMI e adaptadores USB-C do projetor principal', isCompleted: true },
      ]);
    }
  }, [aula]);

  const toggleChecklist = async (id: number | undefined, e: React.MouseEvent) => {
    if (id === undefined) return;
    
    const novoEstado = items.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
    setItems(novoEstado);
    
    // Confete se completou todas
    const recemCompletou = novoEstado.find(i => i.id === id)?.isCompleted;
    if (recemCompletou && novoEstado.length > 0 && novoEstado.every(item => item.isCompleted)) {
      let originX = 0.5;
      let originY = 0.5;
      const card = (e.currentTarget as HTMLElement).closest('.bg-white');
      if (card) {
        const rect = card.getBoundingClientRect();
        originX = (rect.left + rect.width / 2) / window.innerWidth;
        originY = (rect.top + rect.height / 2) / window.innerHeight;
      }
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: ['#7c3aed', '#ec4899', '#10b981', '#f59e0b']
      });
    }

    try {
      await api.toggleChecklistItem(id);
    } catch (err) {
      console.error("Erro ao salvar status do checklist no back-end", err);
      // rollback
      setItems(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
    }
  };

  const total = items.length;
  const concluidas = items.filter(i => i.isCompleted).length;
  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <CheckSquare className="w-5 h-5 text-emerald-500" />
          Checklist Operacional & Infraestrutura
        </h2>
        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-emerald-200/50">
          {concluidas} de {total} concluídas ({progresso}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-5 overflow-hidden">
        <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progresso}%` }}></div>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Sem tarefas operacionais para esta aula.</p>
        ) : items.map(item => (
          <div 
            key={item.id} 
            onClick={(e) => toggleChecklist(item.id, e)}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-100 cursor-pointer hover:border-girlies-purple/30 hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${item.isCompleted ? 'bg-girlies-purple text-white' : 'bg-white border border-slate-300'}`}>
                {item.isCompleted && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold transition-colors ${item.isCompleted ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{item.descricao}</span>
                {item.isCompleted ? (
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">Concluído recentemente</span>
                ) : (
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">Pendente de ação</span>
                )}
              </div>
            </div>
            {item.isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
        ))}
      </div>
    </section>
  );
}
