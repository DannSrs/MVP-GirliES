import { ExternalLink, Printer } from 'lucide-react';

export function EventoViewFooter() {
  return (
    <footer className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
      {/* Info institucional */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 flex-wrap justify-center sm:justify-start">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Status do Registro Institucional: Protocolado no SISAP // IFPE 2026.2
        </span>
        <span className="text-slate-200 hidden sm:block">|</span>
        <span className="text-slate-500 font-semibold">
          Carga Horária de Extensão: <span className="text-girlies-purple">4 Horas Complementares</span>
        </span>
      </div>

      {/* Links de ação */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          type="button"
          className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-girlies-purple transition-colors font-mono"
        >
          <Printer className="w-3.5 h-3.5" />
          Imprimir Folha de Frequência
        </button>
        <span className="text-slate-200">|</span>
        <button
          type="button"
          className="flex items-center gap-1.5 text-[10px] font-bold text-girlies-purple hover:underline transition-colors font-mono"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Iniciar Certificados Automáticos
        </button>
      </div>
    </footer>
  );
}
