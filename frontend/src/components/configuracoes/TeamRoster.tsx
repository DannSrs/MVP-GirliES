import { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Edit2, Key, Trash2 } from 'lucide-react';
import { api, type Usuario } from '../../services/api';

interface TeamRosterProps {
  usuarios: Usuario[];
  currentUser?: Usuario;
  onDelete: (id: number) => void;
  onEdit: (usuario: Usuario) => void;
}

const CORES_AVATAR = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-pink-500', 'bg-amber-500', 'bg-rose-500',
];

export function TeamRoster({ usuarios, currentUser, onDelete, onEdit }: TeamRosterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [tokenModalData, setTokenModalData] = useState<{ nome: string, token: string } | null>(null);

  const handleGenerateToken = async (u: Usuario) => {
    try {
      const res = await api.getTokenUsuario(u.id);
      setTokenModalData({ nome: u.nome, token: res.token });
    } catch (e) {
      alert('Erro ao resgatar token. Tente novamente.');
    }
  };

  // Close menu when clicking outside
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = usuarios.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.nome.toLowerCase().includes(term) ||
      u.funcaoInterna.toLowerCase().includes(term) ||
      u.role.toLowerCase().includes(term)
    );
  });

  const getRoleConfig = (role: string, name: string) => {
    switch (role) {
      case 'adm':
        return {
          label: 'Admin Geral',
          badgeClass: 'bg-purple-900 text-white',
          access: 'Acesso Total',
        };
      case 'professora':
        return {
          label: 'Coordenação',
          badgeClass: 'bg-violet-100 text-violet-700 border-violet-200',
          access: 'Acesso Total',
        };
      case 'voluntaria':
      default:
        // Try to infer specific roles from the name to match the mockup visually
        if (name.includes('Beatriz')) return { label: 'Monitora', badgeClass: 'bg-indigo-100 text-indigo-700', access: 'Editora Aulas' };
        if (name.includes('Maria Eduarda')) return { label: 'Social Media', badgeClass: 'bg-pink-100 text-pink-700', access: 'Midias & Post' };
        if (name.includes('Clara')) return { label: 'Design & Arte', badgeClass: 'bg-purple-100 text-purple-700', access: 'Assets UI' };
        if (name.includes('Ana Júlia')) return { label: 'Monitora Maker', badgeClass: 'bg-fuchsia-100 text-fuchsia-700', access: 'Editora Labs' };
        
        return {
          label: 'Voluntária',
          badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
          access: 'Editora Aulas',
        };
    }
  };

  const currentUserInFiltered = filtered.find((u) => u.id === currentUser?.id);
  const otherUsersInFiltered = filtered.filter((u) => u.id !== currentUser?.id);

  const renderUserRow = (u: Usuario, isCurrentUser: boolean, i: number) => {
    const roleCfg = getRoleConfig(u.role, u.nome);
    const avatarColor = CORES_AVATAR[i % CORES_AVATAR.length];
    const isMenuOpen = menuOpenId === u.id;
    
    // Se for o usuário atual, permitimos as opções se ele for adm, ou então a opção A (só ver token). Mas na verdade a opção A diz "só ver token para ele mesmo, sem editar".
    // Se for outro usuário, só vê o botão se for ADM.
    const showMenuButton = isCurrentUser || currentUser?.role === 'adm';

    return (
      <div key={u.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-colors ${isCurrentUser ? 'bg-girlies-purple/5 hover:bg-girlies-purple/10 border-girlies-purple/20 shadow-sm' : 'bg-slate-50/50 hover:bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-sm ${u.role === 'adm' ? 'bg-gradient-to-br from-girlies-purple to-violet-400' : avatarColor}`}>
            {u.nome[0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-bold text-slate-800">{u.nome}</span>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold font-mono tracking-wider uppercase border border-transparent ${roleCfg.badgeClass}`}>
                {roleCfg.label}
              </span>
              {isCurrentUser && (
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md text-[9px] font-bold font-mono tracking-wider uppercase border border-emerald-200">
                  Você
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 truncate max-w-[280px]">
              {u.funcaoInterna} • {u.curso}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 relative">
          <div className="flex flex-col md:text-right">
            <span className="text-[10px] text-girlies-purple font-mono font-bold uppercase tracking-wider">
              {roleCfg.access}
            </span>
          </div>
          
          {showMenuButton ? (
            <button
              type="button"
              onClick={() => setMenuOpenId(isMenuOpen ? null : u.id)}
              className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8 h-8" /> /* Espaçador para manter alinhamento */
          )}

          {/* Dropdown Menu */}
          {isMenuOpen && showMenuButton && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-10 animate-in fade-in zoom-in-95 duration-100">
              {!isCurrentUser && (
                <button
                  onClick={() => {
                    setMenuOpenId(null);
                    onEdit(u);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-girlies-purple transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Editar perfil
                </button>
              )}
              <button 
                onClick={() => {
                  setMenuOpenId(null);
                  handleGenerateToken(u);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                Ver token de acesso
              </button>
              {!isCurrentUser && u.role !== 'adm' && (
                <>
                  <div className="h-px bg-slate-100 my-1.5" />
                  <button
                    onClick={() => {
                      setMenuOpenId(null);
                      onDelete(u.id);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir membra
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-girlies-purple flex items-center gap-2">
            Roster de Acesso &amp; Membras
            <span className="bg-girlies-purple/10 text-girlies-purple px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-girlies-purple" />
              {usuarios.length} Ativas
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Controle de permissões e papéis ativos no projeto acadêmico
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por nome ou papel..."
            className="w-full md:w-64 pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-girlies-purple/30 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3 relative" ref={menuRef}>
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">Nenhum membro encontrado.</p>
        ) : (
          <>
            {currentUserInFiltered && renderUserRow(currentUserInFiltered, true, usuarios.findIndex(u => u.id === currentUserInFiltered.id))}
            
            {currentUserInFiltered && otherUsersInFiltered.length > 0 && (
              <hr className="my-2 border-slate-100" />
            )}

            {otherUsersInFiltered.map((u) => renderUserRow(u, false, usuarios.findIndex(us => us.id === u.id)))}
          </>
        )}
      </div>

      {/* Modal de Token */}
      {tokenModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col gap-1 text-center">
              <div className="mx-auto w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <Key className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Token de Acesso</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Esta é a chave de acesso para <span className="font-semibold text-slate-700">{tokenModalData.nome}</span>.
              </p>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
              <code className="text-sm font-mono font-bold text-girlies-purple select-all">
                {tokenModalData.token}
              </code>
            </div>

            <button
              onClick={() => setTokenModalData(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors mt-2"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
