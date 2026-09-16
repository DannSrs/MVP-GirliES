import { Calendar, Building2 } from 'lucide-react';
import type { PlanoAula } from '../../../services/api';

interface TerminalHeroCardProps {
  aula?: PlanoAula;
}

export function TerminalHeroCard({ aula }: TerminalHeroCardProps) {
  // Configuração padrão ou fallback (dados mockados iguais ao HTML)
  const titulo = aula?.titulo || "Programação Orientada a Objetos com Mini-jogos em Python";
  const descricao = aula?.descricao || "Construção interativa da arquitetura orientada a objetos desenvolvendo um pet virtual estilo Tamagotchi inspirado no mascote Pip. Hands-on em duplas, encapsulamento prático e mini-hackathon de encerramento.";
  const modulo = aula?.categoria || "MÓDULO 2";
  const local = aula?.local || "Lab 04 — Bloco D";
  
  // Formatando data se existir
  let dataStr = "Qua, 21/10/2026";
  let horaStr = "14h00 às 17h00 (3h)";
  
  if (aula?.dataHora) {
    const dataObj = new Date(aula.dataHora);
    dataStr = dataObj.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
    horaStr = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + 'h';
  }
  
  const semanaStr = aula?.semana ? String(aula.semana).padStart(2, '0') : '00';
  const fileNameSlug = aula?.titulo ? aula.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'poo-minigame';
  const fileName = `semana-${semanaStr}_${fileNameSlug}.py`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex flex-col flex-shrink-0">
      {/* Barra estilo terminal */}
      <div className="bg-[#3b0764] w-full px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6ee7b7]"></div>
            <div className="w-3 h-3 rounded-full bg-[#f9a8d4]"></div>
            <div className="w-3 h-3 rounded-full bg-[#d8b4fe]"></div>
          </div>
          <span className="font-mono text-[10px] text-purple-200 tracking-wider">girli_es :: aulas / {fileName}</span>
        </div>
        <div className="font-mono text-[9px] text-purple-200 font-bold tracking-widest uppercase">
          UTF-8 // PYTHON 3.12
        </div>
      </div>
      
      {/* Corpo do Card Principal */}
      <div className="p-8 flex flex-col lg:flex-row gap-8 justify-between items-start">
        
        <div className="flex-1 flex flex-col gap-4">
          {/* Modulo e Área */}
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
            <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded tracking-wider uppercase">{modulo}</span>
            <span className="text-slate-500 tracking-widest font-medium">Python Fundamentos & Estruturas</span>
          </div>
          
          {/* Título */}
          <h1 className="text-3xl lg:text-[2.5rem] font-extrabold text-slate-800 leading-tight tracking-tight mt-1 mb-2">
            {titulo}
          </h1>
          
          {/* Descrição */}
          <p className="text-slate-500 text-sm leading-relaxed max-w-3xl font-medium">
            {descricao}
          </p>
        </div>

        {/* Info Cards Lateral Direita */}
        <div className="flex flex-col gap-3 w-full lg:w-[22rem] flex-shrink-0 mt-2 lg:mt-0">
          {/* Data / Horário */}
          <div className="flex items-center gap-4 bg-[#f4f5f7] rounded-2xl p-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#e6ccff] text-[#6b21a8] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest mb-0.5">DATA & HORÁRIO</span>
              <span className="text-[13px] font-bold text-slate-800 capitalize">{dataStr}</span>
              <span className="text-[10px] text-[#6b21a8] font-mono mt-0.5">{horaStr}</span>
            </div>
          </div>
          
          {/* Local */}
          <div className="flex items-center gap-4 bg-[#f4f5f7] rounded-2xl p-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#a6f4c5] text-[#065f46] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest mb-0.5">LOCAL DE ENSINO</span>
              <span className="text-[13px] font-bold text-slate-800">{local}</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">Campus Belo Jardim / IFPE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
