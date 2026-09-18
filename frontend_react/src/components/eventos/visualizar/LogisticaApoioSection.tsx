import { useState, useEffect } from 'react';
import { CheckSquare, Check, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { api, type EventoGeral, type ChecklistItem } from '../../../services/api';
import confetti from 'canvas-confetti';

interface LogisticaApoioSectionProps {
  evento?: EventoGeral;
}

export function LogisticaApoioSection({ evento }: LogisticaApoioSectionProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    if (evento?.logisticsChecklist && evento.logisticsChecklist.length > 0) {
      setItems(evento.logisticsChecklist);
    } else {
      // Mock de fallback quando o evento não tem checklist
      setItems([
        { id: 101, descricao: 'Ofício de liberação de chaves do Laboratório Maker', isCompleted: true },
        { id: 102, descricao: '40 Kits de Boas-Vindas GirliES', isCompleted: true },
        { id: 103, descricao: 'Equipamentos Audiovisuais', isCompleted: true },
        { id: 104, descricao: '12 Kits Maker de Circuitos e Arduino', isCompleted: true },
        { id: 105, descricao: 'Coffee Break Comunitário & Lanches', isCompleted: false },
      ]);
    }
  }, [evento]);

  const toggleItem = async (index: number, e: React.MouseEvent) => {
    const itemToToggle = items[index];
    const id = itemToToggle.id;

    const novoEstado = items.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setItems(novoEstado);

    // Confetti se completou todas
    const recemCompletou = novoEstado[index].isCompleted;
    if (recemCompletou && novoEstado.every((i) => i.isCompleted)) {
      const card = (e.currentTarget as HTMLElement).closest('.bg-white');
      let ox = 0.5, oy = 0.5;
      if (card) {
        const r = card.getBoundingClientRect();
        ox = (r.left + r.width / 2) / window.innerWidth;
        oy = (r.top + r.height / 2) / window.innerHeight;
      }
      confetti({ particleCount: 80, spread: 60, origin: { x: ox, y: oy }, colors: ['#7c3aed', '#10b981', '#ec4899', '#f59e0b'] });
    }
  };

  const total = items.length;
  const concluidos = items.filter((i) => i.isCompleted).length;
  const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5 mb-1">
            <ClipboardCheck className="w-5 h-5 text-emerald-500" />
            Logística de Apoio no Campus IFPE
          </h2>
          <p className="text-[10px] text-slate-400 font-mono">Recursos Solicitados, Deferimentos &amp; Materiais</p>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border ${
          progresso === 100
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
            : 'bg-amber-100 text-amber-700 border-amber-200'
        }`}>
          {concluidos}/{total} Aprovados
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-5 overflow-hidden">
        <div
          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progresso}%` }}
        />
      </div>

      {/* Items — sem badges de status */}
      <div className="flex flex-col gap-2.5">
        {items.map((item, idx) => (
          <div
            key={item.id ?? idx}
            onClick={(e) => toggleItem(idx, e)}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50/50 border border-slate-100 cursor-pointer hover:border-girlies-purple/30 hover:bg-slate-50 transition-colors group"
          >
            {/* Checkbox */}
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
              item.isCompleted ? 'bg-girlies-purple text-white' : 'bg-white border border-slate-300'
            }`}>
              {item.isCompleted && <Check className="w-3.5 h-3.5" />}
            </div>

            {/* Texto */}
            <span className={`flex-1 text-xs font-bold transition-colors ${
              item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}>
              {item.descricao}
            </span>

            {item.isCompleted && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
