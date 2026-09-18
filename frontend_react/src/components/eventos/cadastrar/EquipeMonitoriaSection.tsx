import { useState, useEffect } from 'react';
import { Users, Plus, X, CheckCircle2, ChevronDown, UserPlus } from 'lucide-react';
import { useEventoForm } from '../../../contexts/EventoFormContext';
import type { EventoMonitora } from '../../../contexts/EventoFormContext';
import { api, type Usuario } from '../../../services/api';

const CORES_AVATAR = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-pink-500', 'bg-amber-500', 'bg-rose-500',
];

// ─── Tipos locais ──────────────────────────────────────────────────────────────

interface ProfessoraLocal {
  id?: number;         // se veio do backend
  nome: string;
  funcao: string;
  letra: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function EquipeMonitoriaSection() {
  const { formData, updateField } = useEventoForm();
  const monitoras = formData.monitoras;

  // Estado de usuários do backend
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  // Estado da professora selecionada
  const [professora, setProfessora] = useState<ProfessoraLocal | null>(null);
  const [showProfSelect, setShowProfSelect] = useState(false);
  const [profManualNome, setProfManualNome] = useState('');
  const [profManualFuncao, setProfManualFuncao] = useState('Docente Orientadora • IFPE');
  const [profMode, setProfMode] = useState<'select' | 'manual'>('select');

  // Estado para adicionar monitora
  const [showMonitoraForm, setShowMonitoraForm] = useState(false);
  const [monitoraMode, setMonitoraMode] = useState<'select' | 'manual'>('select');
  const [monitoraSelectId, setMonitoraSelectId] = useState<number | ''>('');
  const [monitoraManualNome, setMonitoraManualNome] = useState('');
  const [monitoraManualPapel, setMonitoraManualPapel] = useState('');

  useEffect(() => {
    api.getUsuarios()
      .then(setUsuarios)
      .catch(console.error)
      .finally(() => setLoadingUsuarios(false));
  }, []);

  // Professoras do backend (role = professora ou adm)
  const professoras = usuarios.filter((u) => u.role === 'professora' || u.role === 'adm');
  // Voluntárias disponíveis (excluindo as já escaladas por id)
  const escaladosIds = monitoras.filter((m) => m.id !== undefined).map((m) => m.id!);
  const voluntariaDisponiveis = usuarios.filter(
    (u) => u.role === 'voluntaria' && !escaladosIds.includes(u.id)
  );

  // ── Professora handlers ─────────────────────────────────────────────────────

  const selecionarProfessoraBackend = (userId: number) => {
    const u = professoras.find((p) => p.id === userId);
    if (!u) return;
    setProfessora({ id: u.id, nome: u.nome, funcao: u.funcaoInterna || 'Docente Orientadora', letra: u.nome[0].toUpperCase() });
    setShowProfSelect(false);
  };

  const confirmarProfManual = () => {
    if (!profManualNome.trim()) return;
    setProfessora({ nome: profManualNome.trim(), funcao: profManualFuncao.trim() || 'Docente Orientadora', letra: profManualNome.trim()[0].toUpperCase() });
    setProfManualNome('');
    setShowProfSelect(false);
  };

  // ── Monitora handlers ───────────────────────────────────────────────────────

  const adicionarMonitoraBackend = () => {
    if (monitoraSelectId === '') return;
    const u = usuarios.find((u) => u.id === Number(monitoraSelectId));
    if (!u) return;
    const nova: EventoMonitora & { id?: number } = {
      id: u.id,
      nome: u.nome,
      papel: u.funcaoInterna || 'Monitora Voluntária',
      letra: u.nome[0].toUpperCase(),
      cor: CORES_AVATAR[monitoras.length % CORES_AVATAR.length],
    };
    updateField('monitoras', [...monitoras, nova as EventoMonitora]);
    setMonitoraSelectId('');
    setShowMonitoraForm(false);
  };

  const adicionarMonitoraManual = () => {
    if (!monitoraManualNome.trim()) return;
    const nova: EventoMonitora = {
      nome: monitoraManualNome.trim(),
      papel: monitoraManualPapel.trim() || 'Monitora Voluntária',
      letra: monitoraManualNome.trim()[0].toUpperCase(),
      cor: CORES_AVATAR[monitoras.length % CORES_AVATAR.length],
    };
    updateField('monitoras', [...monitoras, nova]);
    setMonitoraManualNome('');
    setMonitoraManualPapel('');
    setShowMonitoraForm(false);
  };

  const removerMonitora = (index: number) => {
    updateField('monitoras', monitoras.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          4. Equipe &amp; Monitoria
        </h2>
        <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase border border-violet-200">
          STAFF
        </span>
      </div>

      {/* ── Professora / Coordenadora ────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2">
          Professora / Coordenadora Responsável
        </p>

        {professora ? (
          // Professora selecionada
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 group">
            <div className="w-9 h-9 rounded-full bg-girlies-purple text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {professora.letra}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 truncate">{professora.nome}</p>
              <p className="text-[10px] text-slate-400 truncate">{professora.funcao}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <button
                type="button"
                onClick={() => setProfessora(null)}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          // Selector
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 flex flex-col gap-2">
            {/* Toggle select / manual */}
            <div className="flex gap-1 mb-1">
              <button
                type="button"
                onClick={() => setProfMode('select')}
                className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors ${profMode === 'select' ? 'bg-girlies-purple text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                Buscar no sistema
              </button>
              <button
                type="button"
                onClick={() => setProfMode('manual')}
                className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors ${profMode === 'manual' ? 'bg-girlies-purple text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                Adicionar externa
              </button>
            </div>

            {profMode === 'select' ? (
              loadingUsuarios ? (
                <p className="text-[10px] text-slate-400 italic text-center">Carregando usuários...</p>
              ) : (
                <div className="relative">
                  <select
                    onChange={(e) => selecionarProfessoraBackend(Number(e.target.value))}
                    defaultValue=""
                    className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20 appearance-none"
                  >
                    <option value="" disabled>Selecionar professora...</option>
                    {professoras.map((p) => (
                      <option key={p.id} value={p.id}>{p.nome} — {p.funcaoInterna}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={profManualNome}
                  onChange={(e) => setProfManualNome(e.target.value)}
                  placeholder="Nome da professora"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20"
                />
                <input
                  type="text"
                  value={profManualFuncao}
                  onChange={(e) => setProfManualFuncao(e.target.value)}
                  placeholder="Função / Cargo"
                  onKeyDown={(e) => e.key === 'Enter' && confirmarProfManual()}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20"
                />
                <button
                  type="button"
                  onClick={confirmarProfManual}
                  disabled={!profManualNome.trim()}
                  className="w-full py-1.5 rounded-lg text-xs font-semibold bg-girlies-purple text-white hover:bg-[#3d004d] transition-colors disabled:opacity-40"
                >
                  Confirmar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Monitoras Escaladas ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            Monitoras Escaladas
          </p>
          <button
            type="button"
            onClick={() => setShowMonitoraForm(true)}
            className="text-[10px] font-bold text-girlies-purple hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Adicionar
          </button>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-2">
          {monitoras.map((m, index) => (
            <div key={index} className="flex items-center gap-2.5 group">
              <div className={`w-8 h-8 rounded-full ${m.cor} text-white flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                {m.letra}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700 truncate">{m.nome}</p>
                <p className="text-[10px] text-slate-400 truncate">{m.papel}</p>
              </div>
              <button
                type="button"
                onClick={() => removerMonitora(index)}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {monitoras.length === 0 && !showMonitoraForm && (
            <p className="text-[10px] text-slate-400 italic">Nenhuma monitora escalada ainda.</p>
          )}
        </div>

        {/* Form de adicionar monitora */}
        {showMonitoraForm && (
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
            {/* Toggle */}
            <div className="flex gap-1 mb-1">
              <button
                type="button"
                onClick={() => setMonitoraMode('select')}
                className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors ${monitoraMode === 'select' ? 'bg-girlies-purple text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                Do sistema
              </button>
              <button
                type="button"
                onClick={() => setMonitoraMode('manual')}
                className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors ${monitoraMode === 'manual' ? 'bg-girlies-purple text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                Externa
              </button>
            </div>

            {monitoraMode === 'select' ? (
              loadingUsuarios ? (
                <p className="text-[10px] text-slate-400 italic text-center">Carregando...</p>
              ) : voluntariaDisponiveis.length === 0 ? (
                <p className="text-[10px] text-slate-400 italic text-center">Nenhuma voluntária disponível.</p>
              ) : (
                <div className="relative">
                  <select
                    value={monitoraSelectId}
                    onChange={(e) => setMonitoraSelectId(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20 appearance-none"
                  >
                    <option value="" disabled>Selecionar monitora...</option>
                    {voluntariaDisponiveis.map((u) => (
                      <option key={u.id} value={u.id}>{u.nome} — {u.funcaoInterna}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )
            ) : (
              <>
                <input
                  type="text"
                  value={monitoraManualNome}
                  onChange={(e) => setMonitoraManualNome(e.target.value)}
                  placeholder="Nome da monitora"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20"
                  autoFocus
                />
                <input
                  type="text"
                  value={monitoraManualPapel}
                  onChange={(e) => setMonitoraManualPapel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && adicionarMonitoraManual()}
                  placeholder="Papel / Função"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-girlies-purple/20"
                />
              </>
            )}

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => { setShowMonitoraForm(false); setMonitoraSelectId(''); setMonitoraManualNome(''); setMonitoraManualPapel(''); }}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={monitoraMode === 'select' ? adicionarMonitoraBackend : adicionarMonitoraManual}
                disabled={monitoraMode === 'select' ? monitoraSelectId === '' : !monitoraManualNome.trim()}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-girlies-purple text-white hover:bg-[#3d004d] transition-colors disabled:opacity-40 flex items-center justify-center gap-1"
              >
                <UserPlus className="w-3 h-3" /> Adicionar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
