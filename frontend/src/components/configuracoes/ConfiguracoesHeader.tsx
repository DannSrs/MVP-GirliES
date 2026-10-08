import { Link } from 'react-router-dom';
import { Settings, UserPlus, Home } from 'lucide-react';

interface ConfiguracoesHeaderProps {
  onAddClick: () => void;
}

export function ConfiguracoesHeader({ onAddClick }: ConfiguracoesHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-girlies-purple/5 via-white to-emerald-50/30 rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-4">
        <Home className="w-3 h-3" />
        <Link to="/" className="hover:text-girlies-purple transition-colors">workspace</Link>
        <span className="text-slate-300">/</span>
        <Link to="/" className="hover:text-girlies-purple transition-colors">painel</Link>
        <span className="text-slate-300">/</span>
        <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded-full font-bold tracking-wider">
          ● Semestre 2026.2
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Badge superior */}
          <div className="flex">
            <span className="flex items-center gap-1.5 bg-girlies-purple/10 text-girlies-purple font-mono text-[9px] font-bold px-2 py-1 rounded tracking-wider uppercase">
              <Settings className="w-3 h-3" /> ADMIN_WORKSPACE // CONFIG
            </span>
          </div>

          <h1 className="text-3xl font-bold text-girlies-purple tracking-tight mt-1">
            Configurações do Sistema &amp; Equipe
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            Gerenciamento de perfil individual, chaves de autenticação dos labs, permissões de acesso e membros ativas do núcleo GirliES • IFPE Campus.
          </p>
        </div>

        {/* Botão de adicionar */}
        <button
          type="button"
          onClick={onAddClick}
          className="flex items-center gap-2 bg-[#9ef0d2] hover:bg-[#85e8c3] text-emerald-900 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm whitespace-nowrap self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Adicionar Membra
        </button>
      </div>
    </header>
  );
}
