import { Users } from 'lucide-react';
import type { PlanoAula, Usuario } from '../../../services/api';

interface EquipeEscaladaProps {
  aula?: PlanoAula;
  usuarios?: Usuario[];
}

export function EquipeEscalada({ aula, usuarios = [] }: EquipeEscaladaProps) {
  const responsaveisIds = aula?.responsaveisId || [];
  const assignedUsers = responsaveisIds.map(id => usuarios.find(u => u.id === id)).filter(Boolean) as Usuario[];

  const docentes = assignedUsers.filter(u => 
    u.role === 'adm' || 
    u.funcaoInterna?.toLowerCase().includes('docente') || 
    u.funcaoInterna?.toLowerCase().includes('prof')
  );
  
  const monitoras = assignedUsers.filter(u => !docentes.includes(u));

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <Users className="w-5 h-5 text-girlies-purple" />
          Equipe Escalada
        </h2>
        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
          {assignedUsers.length} membros
        </span>
      </div>

      {assignedUsers.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-slate-400 italic">Nenhuma pessoa atribuída a esta aula.</p>
        </div>
      )}

      {/* Docentes */}
      {docentes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">Docentes Responsáveis</h3>
          <div className="flex flex-col gap-2.5">
            {docentes.map(docente => (
              <div key={docente.id} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3b0764] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border-2 border-white">
                  {getInitials(docente.nome)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{docente.nome}</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-0.5">{docente.funcaoInterna || 'Docente'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monitoras */}
      {monitoras.length > 0 && (
        <div>
          <h3 className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">Monitoras & Apoio Técnico</h3>
          <div className="flex flex-col gap-2.5">
            {monitoras.map(monitora => (
              <div key={monitora.id} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-girlies-light text-girlies-purple flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                    {getInitials(monitora.nome)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{monitora.nome}</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">{monitora.funcaoInterna || 'Membro'}</span>
                  </div>
                </div>
                {/* ta mockado por enquanto, pois a api não retorna status de monitoria: <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                  {'Ativa'} 
                </span> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
