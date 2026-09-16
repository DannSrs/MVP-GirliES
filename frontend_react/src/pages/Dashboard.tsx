import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FlaskConical, 
  CalendarDays, 
  MapPin, 
  AlarmClock, 
  Rocket, 
  CheckCircle2, 
  Circle, 
  LayoutGrid, 
  BookMarked, 
  Check, 
  ArrowRight, 
  FileText, 
  Layout 
} from 'lucide-react';

export function Dashboard() {
  const [checklist, setChecklist] = useState([
    { id: 'ck1', text: 'Pegar chaves do laboratório na portaria', checked: true },
    { id: 'ck2', text: 'Levar massinha de modelar & protoboards', checked: false },
    { id: 'ck3', text: 'Testar simulador Logisim nos 20 PCs', checked: false },
    { id: 'ck4', text: 'Imprimir apostilas ilustradas de exercícios', checked: false }
  ]);

  const [logistica, setLogistica] = useState([
    { id: 1, text: '2 equipes de garotas formadas e inscritas', checked: true },
    { id: 2, text: 'Oficina preparatória de API da NASA agendada', checked: false },
    { id: 3, text: 'Aprovação de auxílio transporte junto à PROEXT', checked: false }
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleLogistica = (id: number) => {
    setLogistica(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const logisticaConcluidas = logistica.filter(item => item.checked).length;
  const logisticaTotal = logistica.length;
  const logisticaPct = Math.round((logisticaConcluidas / logisticaTotal) * 100);

  return (
    <>
      {/* ── Greeting Banner ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 pt-7 pb-6 flex-shrink-0 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-girlies-purple/5 to-transparent pointer-events-none"></div>
        {/* Session bar */}
        <div className="relative flex items-center gap-2 mb-4 font-mono text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 dot-pulse inline-block"></span>
            <span className="text-emerald-600 font-semibold">SYS.ONLINE</span>
          </span>
          <span className="text-slate-300">//</span>
          <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded text-[10px] font-semibold">DEV_SESSION</span>
          <span className="text-slate-400">&lt;girli_es:root&gt;</span>
        </div>
        {/* Name */}
        <div className="relative">
          <h1 className="text-3xl font-bold text-girlies-purple mb-1.5">Olá, Letícia! <span className="text-pink-500">♥</span></h1>
          <p className="text-sm text-slate-500">
            Painel de Extensão Universitária •{' '}
            <a href="#" className="text-girlies-purple font-medium hover:underline">Engenharia de Software IFPE</a>{' '}
            • <span className="text-girlies-purple font-semibold">Semestre 2026.2</span>
          </p>
        </div>
      </section>

      {/* ── Operações Prioritárias ── */}
      <section className="flex flex-col flex-shrink-0">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="font-semibold text-girlies-purple flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-girlies-purple inline-block"></span>
            Operações Prioritárias da Semana
          </h2>
          <span className="text-xs text-slate-400 font-mono">Ciclo Ativo: ...</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {/* Card 1: Lab Prático */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="badge-tag bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded uppercase">Lab Prático</span>
                  <span className="badge-tag text-slate-400 font-mono">• Semana 02</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-girlies-purple/5 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-girlies-purple" />
                </div>
              </div>
              <h3 className="font-bold text-girlies-purple text-base leading-snug">
                Sistemas Digitais &amp;<br />Circuitos Lógicos
              </h3>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>16 de Setembro • 14:00 às 17:38</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Lab 3, Bloco D (Engenharia de Software)</span>
              </div>
            </div>
            {/* Checklist */}
            <div className="px-4 pb-3 flex-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Checklist de Bancada</p>
              <ul className="space-y-1.5">
                {checklist.map(item => (
                  <li key={item.id} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={item.id} 
                      checked={item.checked}
                      onChange={() => toggleChecklist(item.id)}
                      className="w-3.5 h-3.5 rounded flex-shrink-0"
                    />
                    <label htmlFor={item.id} className={`text-xs cursor-pointer ${item.checked ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                      {item.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer */}
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 mb-0.5">Líderes do Módulo:</p>
                <p className="text-xs text-girlies-purple font-semibold">Letícia &amp; Profa. Vitória</p>
              </div>
              <Link to="/aulas/visualizar" className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                <FileText className="w-3.5 h-3.5" />
                Ver Plano de Aula
              </Link>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="badge-tag bg-pink-100 text-pink-700 px-2 py-0.5 rounded uppercase">Instagram</span>
                  <span className="badge-tag text-slate-400">• Carrossel Educativo</span>
                </div>
                <span className="badge-tag bg-amber-400 text-amber-900 px-2 py-0.5 rounded uppercase">Em Produção</span>
              </div>
              <h3 className="font-bold text-girlies-purple text-base leading-snug italic">
                "O que é<br />Engenharia de Software?"
              </h3>
            </div>
            <div className="px-4 py-3 flex-1 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Público Alvo:</span>
                <span className="text-slate-700 text-xs font-medium">Garotas do Ensino Médio</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Prazo Final:</span>
                <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                  <AlarmClock className="w-3 h-3" />
                  Amanhã • 18:00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Design &amp; Copy:</span>
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">LI</div>
                  <div className="w-6 h-6 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">MA</div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">BI</div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors">
                <Layout className="w-3.5 h-3.5" />
                Revisar Carrossel
              </button>
            </div>
          </div>

          {/* Card 3: Hackathon */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="badge-tag bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">Missão Externa</span>
                  <span className="badge-tag text-slate-400 font-mono">// Hackathon</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-slate-500" />
                </div>
              </div>
              <h3 className="font-bold text-girlies-purple text-base leading-snug">NASA Space Apps<br />Caruaru 2026</h3>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>04 a 06 de Outubro • 48 Horas</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Campus IFMaker / Polo Tecnológico</span>
              </div>
            </div>
            {/* Logística */}
            <div className="px-4 pb-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Logística GirliES</p>
                <span className="text-xs text-slate-500 font-semibold">
                  {logisticaConcluidas} de {logisticaTotal} concluídas <span className="text-slate-400 font-normal">({logisticaPct}%)</span>
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-girlies-purple rounded-full transition-all duration-500" style={{ width: `${logisticaPct}%` }}></div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                {logistica.map(item => (
                  <li 
                    key={item.id} 
                    onClick={() => toggleLogistica(item.id)}
                    className="flex items-start gap-2 cursor-pointer select-none rounded-md px-1 py-0.5 -mx-1 hover:bg-slate-50 transition-colors"
                  >
                    {item.checked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={item.checked ? 'line-through text-slate-400' : ''}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 bg-girlies-purple hover:bg-[#3d004d] text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors shadow-md shadow-girlies-purple/20">
                <LayoutGrid className="w-3.5 h-3.5" />
                Acessar Painel de Logística
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trilha Pedagógica ── */}
      <section className="pb-10 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookMarked className="w-4 h-4 text-girlies-purple" />
              <h2 className="font-bold text-girlies-purple">Trilha Pedagógica <span className="text-slate-400 font-normal">•</span> Semestre 2026.2</h2>
            </div>
            <span className="bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">14 Semanas Totais</span>
          </div>

          {/* Timeline list */}
          <div className="divide-y divide-slate-100">
            {/* Semana 01 */}
            <div className="timeline-item px-6 py-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-emerald-600">Semana 01</span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-sm font-semibold text-slate-700">Acolhida &amp; Mindset Dev</span>
                </div>
                <p className="text-xs text-slate-500">Apresentação da equipe, dinâmica de quebra-gelo e instalação de ambiente VS Code.</p>
              </div>
              <span className="text-xs text-emerald-600 font-semibold flex-shrink-0 mt-1">Concluída</span>
            </div>

            {/* Semana 02 */}
            <div className="timeline-item px-6 py-4 flex items-start gap-4 bg-girlies-purple/5">
              <div className="w-9 h-9 rounded-full bg-girlies-purple flex items-center justify-center flex-shrink-0 mt-0.5 shadow shadow-girlies-purple/30">
                <span className="text-white text-xs font-bold">02</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-girlies-purple">Semana 02</span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-sm font-semibold text-girlies-purple">Sistemas Digitais &amp; Lógica Booleana</span>
                  <span className="badge-tag bg-girlies-purple text-white px-2 py-0.5 rounded uppercase">Em Curso</span>
                </div>
                <p className="text-xs text-slate-500">Portas AND, OR, NOT com circuitos no protoboard físico e exercícios com massinha condutiva.</p>
              </div>
              <span className="text-xs text-girlies-purple font-semibold flex-shrink-0 mt-1">Próx: Quarta</span>
            </div>

            {/* Semana 03 */}
            <div className="timeline-item px-6 py-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-slate-500 text-xs font-bold">03</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-slate-400">Semana 03</span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-sm font-semibold text-slate-600">Primeiros Passos com Python &amp; Algoritmos</span>
                </div>
                <p className="text-xs text-slate-400">Variáveis, tipos primitivos, estruturas condicionais e criação do primeiro mini-bot.</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0 mt-1">23 de Set</span>
            </div>

            {/* Semana 04 */}
            <div className="timeline-item px-6 py-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-slate-500 text-xs font-bold">04</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-slate-400">Semana 04</span>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-sm font-semibold text-slate-600">Git, GitHub &amp; Open-Source Para Todas</span>
                </div>
                <p className="text-xs text-slate-400">Versionamento em equipe, primeiros pull requests e customização de perfil no GitHub.</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0 mt-1">30 de Set</span>
            </div>
          </div>

          {/* Footer link */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <a href="#" className="text-girlies-purple text-sm font-semibold hover:text-[#3d004d] flex items-center gap-1.5 transition-colors">
              Ver ementa completa (42 horas curriculares)
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs text-slate-400 font-mono">Laboratório 4 – Bloco D IFPE</span>
          </div>
        </div>
      </section>
    </>
  );
}
