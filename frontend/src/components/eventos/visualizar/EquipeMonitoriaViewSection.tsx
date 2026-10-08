import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { api, type EventoGeral, type Usuario } from '../../../services/api';

interface EquipeMonitoriaViewSectionProps {
  evento?: EventoGeral;
}

const AVATAR_COLORS = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-pink-500', 'bg-amber-500', 'bg-cyan-500'];

function getInitials(nome: string): string {
  return nome.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

export function EquipeMonitoriaViewSection({ evento }: EquipeMonitoriaViewSectionProps) {
  const [voluntarias, setVoluntarias] = useState<Usuario[]>([]);

  useEffect(() => {
    if (!evento?.responsaveisId || evento.responsaveisId.length === 0) {
      setVoluntarias([]);
      return;
    }
    api.getUsuarios().then(usuarios => {
      const filtradas = usuarios.filter(u => evento.responsaveisId!.includes(Number(u.id)));
      setVoluntarias(filtradas);
    }).catch(console.error);
  }, [evento]);

  const totalIntegrantes = voluntarias.length;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <Users className="w-5 h-5 text-girlies-purple" />
          Equipe &amp; Monitoria
        </h2>
        <span className="text-[10px] font-mono text-slate-400 font-bold">
          Monitoras GirliES
          <span className="ml-2 bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded font-bold">
            {totalIntegrantes} integrante{totalIntegrantes !== 1 ? 's' : ''}
          </span>
        </span>
      </div>

      {/* Monitoras */}
      <div className="flex flex-col gap-3">
        {voluntarias.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4 italic">
            Nenhuma voluntária foi vinculada a este evento.
          </p>
        ) : (
          voluntarias.map((u, i) => (
            <div key={u.id} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0`}>
                {getInitials(u.nome)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700">{u.nome}</p>
                <p className="text-[10px] text-slate-400 leading-tight">{u.funcaoInterna || u.role}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" title="Ativa" />
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {totalIntegrantes > 0 && (
        <div className="bg-girlies-purple/5 rounded-xl p-3 border border-girlies-purple/10">
          <p className="text-[10px] text-girlies-purple font-mono font-bold text-center">
            GirliES Squad • {totalIntegrantes} Voluntária{totalIntegrantes !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </section>
  );
}
