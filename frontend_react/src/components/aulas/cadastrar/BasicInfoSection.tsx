import React from 'react';
import { ChevronDown, FileCode2, GraduationCap, Type } from 'lucide-react';

export function BasicInfoSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          1. Informações Básicas da Aula
        </h2>
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">Etapa 01</span>
      </div>

      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
          Módulo Temático <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <select className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all appearance-none text-slate-700 font-medium bg-slate-50 focus:bg-white cursor-pointer">
            <option>Módulo 2: Python Fundamentos & Estruturas</option>
            <option>Módulo 1: Lógica & Pensamento</option>
            <option>Módulo 3: Projetos & Git</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-girlies-purple transition-colors" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-5">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
          Título Curto & Ementa Central <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <Type className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
          <input type="text" placeholder="Programação Orientada a Objetos com Mini-jogos em Python" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all text-slate-700 font-medium bg-slate-50 focus:bg-white" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-end">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Descrição Pedagógica & Objetivos de Aprendizagem
          </label>
          <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
            <FileCode2 className="w-3 h-3" /> Markdown habilitado
          </span>
        </div>
        <textarea rows={5} className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all resize-none text-slate-700 font-medium bg-slate-50 focus:bg-white" placeholder="Objetivo: Desmistificar classes e herança construindo as mecânicas de um mini-game estilo Tamagotchi / Mascote Virtual.&#10;&#10;- Abertura com retrospectiva calorosa (15 min)&#10;- Code-along: construindo a classe 'Mascote' com status de energia e humor (50 min)&#10;- Hack-em-duplas: adicionando novos atributos e comandos via CLI (60 min)"></textarea>
      </div>
    </section>
  );
}
