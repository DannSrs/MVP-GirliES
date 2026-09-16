import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  LayoutDashboard, 
  BookOpen, 
  Camera, 
  Calendar,
  Settings, 
  LogOut 
} from 'lucide-react';

export function Sidebar() {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all";
    if (isActive) {
      return `${baseClass} nav-active text-white`;
    }
    return `${baseClass} text-slate-500 hover:text-girlies-purple hover:bg-slate-50`;
  };

  return (
    <aside className="w-52 bg-white flex flex-col flex-shrink-0 h-full rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-girlies-purple flex items-center justify-center shadow-lg shadow-girlies-purple/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-800 font-bold text-lg tracking-tight">GirliES</span>
          <span className="bg-emerald-400 text-emerald-900 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">CORE</span>
        </div>
        <p className="text-slate-500 text-[10px] font-mono pl-10">Girls in SE • IFPE</p>
      </div>

      {/* Nav */}
      <nav className="p-3 space-y-1 mt-2 mb-2 flex-1">
        <NavLink to="/" end className={getNavClass}>
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </NavLink>
        
        <NavLink to="/aulas" className={getNavClass}>
          <BookOpen className="w-4 h-4" />
          Aulas
        </NavLink>
        
        <NavLink to="/instagram" className={getNavClass}>
          <Camera className="w-4 h-4" />
          Instagram
        </NavLink>
        
        <NavLink to="/eventos" className={getNavClass}>
          <Calendar className="w-4 h-4" />
          Eventos
        </NavLink>

        <div className="pt-4">
          <NavLink to="/configuracoes" className={getNavClass}>
            <Settings className="w-4 h-4" />
            <span className="leading-tight">
              Configurações<br />
              <span className="font-normal text-xs">& Equipe</span>
            </span>
          </NavLink>
        </div>
      </nav>

      {/* User Profile */}
      <div className="px-3 pb-3">
        <div className="bg-slate-100 rounded-xl p-3">
          <div className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-200 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-girlies-purple flex items-center justify-center text-white text-xs font-bold shadow">
              L
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-xs font-semibold truncate">Letícia</p>
              <p className="text-slate-500 text-[10px] truncate">Dev // Infra</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-500 flex-shrink-0" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-girlies-purple text-[10px] font-mono font-semibold">GirliES Squad</span>
            <span className="text-emerald-600 text-[10px] font-mono font-bold">v2.6.2</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
