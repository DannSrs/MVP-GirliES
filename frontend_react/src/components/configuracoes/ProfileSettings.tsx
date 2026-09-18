import { MonitorPlay, Save, KeyRound } from 'lucide-react';

export function ProfileSettings() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5">
      {/* Header do perfil */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">
            PROFILE.CFG
          </span>
        </div>
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-emerald-200">
          ONLINE
        </span>
      </div>

      {/* Info principal com Avatar Letra */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-girlies-purple to-violet-400 text-white flex items-center justify-center text-2xl font-extrabold shadow-md flex-shrink-0 relative">
          LS
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <MonitorPlay className="w-3.5 h-3.5 text-girlies-purple" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-800">Letícia Silva</h2>
            <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider uppercase">
              Líder Técnica
            </span>
          </div>
          <p className="text-[10px] font-mono text-slate-500 font-semibold mb-1">
            Dev // Infra &amp; Redes dos Labs
          </p>
          <p className="text-xs text-girlies-purple font-medium">
            Matrícula 20241ES0042 • 4º Período
          </p>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Formulário estático */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
              Nome Completo
            </label>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Público</span>
          </div>
          <input
            type="text"
            value="Letícia Silva"
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-slate-50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            E-mail Institucional
          </label>
          <input
            type="text"
            value="leticia.silva@discente.ifpe.edu.br"
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-slate-50 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider truncate">
              Matrícula IFPE
            </label>
            <input
              type="text"
              value="20241ES0042"
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-slate-50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider truncate">
              Curso &amp; Período
            </label>
            <input
              type="text"
              value="B.E.S. • 4º Semestre"
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-slate-50 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
            Função Interna no Squad
          </label>
          <input
            type="text"
            value="Desenvolvimento de Sistemas & Infraestrutura dos Labs"
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-slate-50 outline-none"
          />
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          className="flex-1 bg-girlies-purple hover:bg-[#3d004d] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-girlies-purple/30 flex items-center justify-center gap-2"
        >
          <Save className="w-3.5 h-3.5" />
          Salvar Alterações
        </button>
        <button
          type="button"
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <KeyRound className="w-3.5 h-3.5" />
          Trocar Senha
        </button>
      </div>
    </section>
  );
}
