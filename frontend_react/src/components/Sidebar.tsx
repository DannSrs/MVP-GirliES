import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Camera,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

export function Sidebar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all";
    if (isActive) {
      return `${baseClass} nav-active text-white`;
    }
    return `${baseClass} text-slate-500 hover:text-girlies-purple hover:bg-slate-50`;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = currentUser?.nome ? currentUser.nome.charAt(0).toUpperCase() : '?';

  return (
    <aside className="w-52 bg-white flex flex-col flex-shrink-0 h-full rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Logo */}
      <div className="px-5 pt-8 pb-6 border-b border-slate-200 flex items-center justify-center">
        <img src={logo} alt="GirliES Logo" className="w-40 h-auto object-contain" />
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
          <button 
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2.5 cursor-pointer hover:bg-slate-200 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-girlies-purple flex items-center justify-center text-white text-xs font-bold shadow">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-xs font-semibold truncate">{currentUser?.nome || 'Usuário'}</p>
              <p className="text-slate-500 text-[10px] truncate">{currentUser?.funcaoInterna || 'Cargo'}</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-500 flex-shrink-0" />
          </button>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-girlies-purple text-[10px] font-mono font-semibold">GirliES Squad</span>
            <span className="text-emerald-600 text-[10px] font-mono font-bold">v2.6.2</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
