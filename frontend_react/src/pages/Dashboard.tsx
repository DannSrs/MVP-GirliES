import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  CalendarDays,
  MapPin,
  AlarmClock,
  Rocket,
  LayoutGrid,
  BookMarked,
  Check,
  ArrowRight,
  FileText,
  Layout,
  AlertCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api, type PlanoAula, type PostInstagram, type EventoGeral } from '../services/api';

import { useCicloAtivo } from '../hooks/useCicloAtivo';
import { useAuth } from '../contexts/AuthContext';
import { MiniChecklist } from '../components/MiniChecklist';

export function Dashboard() {
  const { currentUser } = useAuth();
  const [aulas, setAulas] = useState<PlanoAula[]>([]);
  const [posts, setPosts] = useState<PostInstagram[]>([]);
  const [eventos, setEventos] = useState<EventoGeral[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados locais para checklists para manter interatividade rápida na UI antes de salvar no DB
  const [localChecklistAula, setLocalChecklistAula] = useState<any[]>([]);
  const [localChecklistEvento, setLocalChecklistEvento] = useState<any[]>([]);

  const { cicloAtivo, loading: loadingCiclo } = useCicloAtivo();

  useEffect(() => {
    if (loadingCiclo) return;

    const carregarDados = async () => {
      try {
        setLoading(true);

        // 2. Carrega as aulas da trilha e as coisas do ciclo calculado
        const [todasAulas, postsCiclo, eventosCiclo, usuariosList] = await Promise.all([
          api.getAulas(),
          api.getPostsDaSemana(cicloAtivo),
          api.getEventosDaSemana(cicloAtivo),
          api.getUsuarios()
        ]);

        setAulas(Array.isArray(todasAulas) ? todasAulas : []);
        setPosts(Array.isArray(postsCiclo) ? postsCiclo : []);
        setEventos(Array.isArray(eventosCiclo) ? eventosCiclo : []);
        setUsuarios(Array.isArray(usuariosList) ? usuariosList : []);

        // 3. Inicializa as checklists locais para as prioridades
        const aulaAtual = Array.isArray(todasAulas) ? todasAulas.find(a => a.semana === cicloAtivo) : null;
        if (aulaAtual?.checklist) {
          setLocalChecklistAula(aulaAtual.checklist);
        }
        if (Array.isArray(eventosCiclo) && eventosCiclo.length > 0 && eventosCiclo[0].logisticsChecklist) {
          setLocalChecklistEvento(eventosCiclo[0].logisticsChecklist);
        }
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, [loadingCiclo, cicloAtivo]);

  const dispararConfetesNoElemento = (e?: React.MouseEvent<any> | React.ChangeEvent<any>) => {
    let originX = 0.5;
    let originY = 0.5;
    
    if (e && e.currentTarget) {
      const card = (e.currentTarget as HTMLElement).closest('.hover-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        originX = (rect.left + rect.width / 2) / window.innerWidth;
        originY = (rect.top + rect.height / 2) / window.innerHeight;
      }
    }
    
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ['#7c3aed', '#ec4899', '#10b981', '#f59e0b']
    });
  };

  const toggleChecklistAula = async (id: number | undefined, e?: React.ChangeEvent<HTMLInputElement>) => {
    if (id === undefined) return;
    // Atualização otimista na UI
    const novoEstado = localChecklistAula.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
    setLocalChecklistAula(novoEstado);
    
    // Easter Egg: Confete se completou todas as tarefas da aula!
    const recemCompletou = novoEstado.find(i => i.id === id)?.isCompleted;
    if (recemCompletou && novoEstado.length > 0 && novoEstado.every(item => item.isCompleted)) {
      dispararConfetesNoElemento(e);
    }

    try {
      await api.toggleChecklistItem(id);
    } catch (err) {
      console.error("Erro ao salvar no back-end", err);
      // Reverte o estado caso a API falhe
      setLocalChecklistAula(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
    }
  };

  const toggleChecklistEvento = async (id: number | undefined, e?: React.MouseEvent<HTMLLIElement>) => {
    if (id === undefined) return;
    // Atualização otimista na UI
    const novoEstado = localChecklistEvento.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
    setLocalChecklistEvento(novoEstado);

    // Easter Egg: Confete se completou todas as tarefas do evento!
    const recemCompletou = novoEstado.find(i => i.id === id)?.isCompleted;
    if (recemCompletou && novoEstado.length > 0 && novoEstado.every(item => item.isCompleted)) {
      dispararConfetesNoElemento(e);
    }

    try {
      await api.toggleChecklistItem(id);
    } catch (err) {
      console.error("Erro ao salvar no back-end", err);
      // Reverte o estado caso a API falhe
      setLocalChecklistEvento(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
    }
  };

  const aulaDestaque = aulas.find(a => a.semana === cicloAtivo);
  const postDestaque = posts.length > 0 ? posts[0] : null;
  const eventoDestaque = eventos.length > 0 ? eventos[0] : null;

  const temPrioridades = aulaDestaque || postDestaque || eventoDestaque;

  const renderEmptyState = () => (
    <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center col-span-full">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
        <LayoutGrid className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-600">Ainda não chegou nada por aqui...</h3>
      <p className="text-xs text-slate-400 mt-1 max-w-sm">Parece que o squad resolveu tirar férias essa semana! Não há operações registradas para o Ciclo {cicloAtivo}.</p>
    </div>
  );

  const getInitials = (id?: number) => {
    if (!id) return null;
    const u = usuarios.find(user => user.id === id);
    return u ? u.nome.charAt(0).toUpperCase() : '?';
  };

  const getNome = (id?: number) => {
    if (!id) return null;
    const u = usuarios.find(user => user.id === id);
    return u ? u.nome : 'Desconhecido';
  };

  const primeiroNome = currentUser?.nome?.split(' ')[0] || 'Usuária';


  return (
    <>
      {/* ── Greeting Banner ── */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 pt-7 pb-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-girlies-purple/5 to-transparent pointer-events-none"></div>
        <div className="relative flex items-center gap-2 mb-4 font-mono text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 dot-pulse inline-block"></span>
            <span className="text-emerald-600 font-semibold">SYS.ONLINE</span>
          </span>
          <span className="text-slate-300">//</span>
          <span className="bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded text-[10px] font-semibold">DEV_SESSION</span>
          <span className="text-slate-400">&lt;girli_es:root&gt;</span>
        </div>
        <div className="relative">
          <h1 className="text-3xl font-bold text-girlies-purple mb-1.5">Olá, {primeiroNome}! <span className="text-pink-500">♥</span></h1>
          <p className="text-sm text-slate-500">
            Painel de Extensão Universitária •{' '}
            <a href="#" className="text-girlies-purple font-medium hover:underline">Engenharia de Software IFPE</a>{' '}
            • <span className="text-girlies-purple font-semibold">Semestre 2026.2</span>
          </p>
        </div>
      </section>

      {/* ── Operações Prioritárias ── */}
      <section className="flex flex-col flex-shrink-0">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="font-semibold text-girlies-purple flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-girlies-purple inline-block"></span>
            Operações Prioritárias da Semana
          </h2>
          <span className="text-xs text-slate-400 font-mono">Ciclo Ativo: Semana {cicloAtivo}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {loading ? (
            <div className="col-span-full text-center text-slate-400 text-sm py-10">Carregando dados da missão...</div>
          ) : !temPrioridades ? (
            renderEmptyState()
          ) : (
            <>
              {/* Card 1: Lab Prático */}
              {aulaDestaque && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag bg-girlies-purple/10 text-girlies-purple px-2 py-0.5 rounded uppercase">{aulaDestaque.categoria || 'Lab Prático'}</span>
                        <span className="badge-tag text-slate-400 font-mono">• Semana {aulaDestaque.semana}</span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-girlies-purple/5 flex items-center justify-center">
                        <FlaskConical className="w-4 h-4 text-girlies-purple" />
                      </div>
                    </div>
                    <h3 className="font-bold text-girlies-purple text-base leading-snug">
                      {aulaDestaque.titulo}
                    </h3>
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{aulaDestaque.dataHora ? new Date(aulaDestaque.dataHora).toLocaleDateString('pt-BR') : '--'} • {aulaDestaque.dataHora ? new Date(aulaDestaque.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{aulaDestaque.local || 'Não definido'}</span>
                    </div>
                  </div>
                  {/* Checklist */}
                  <div className="px-4 pb-3 flex-1">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Checklist de Bancada</p>
                    {localChecklistAula.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Sem checklist para esta aula.</p>
                    ) : (
                      <MiniChecklist 
                        items={localChecklistAula}
                        onToggle={(id) => toggleChecklistAula(Number(id))}
                        showProgress={true}
                      />
                    )}
                  </div>
                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 mb-0.5">Status:</p>
                      <p className="text-xs text-girlies-purple font-semibold">{aulaDestaque.status || 'Agendado'}</p>
                    </div>
                    <Link to={`/aulas/${aulaDestaque.id}`} className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                      <FileText className="w-3.5 h-3.5" />
                      Ver Plano de Aula
                    </Link>
                  </div>
                </div>
              )}

              {/* Card 2: Instagram */}
              {postDestaque && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag bg-pink-100 text-pink-700 px-2 py-0.5 rounded uppercase">Instagram</span>
                        <span className="badge-tag text-slate-400">• {postDestaque.tipoPost}</span>
                      </div>
                      <span className="badge-tag bg-amber-400 text-amber-900 px-2 py-0.5 rounded uppercase">{postDestaque.status || 'Pendente'}</span>
                    </div>
                    <h3 className="font-bold text-girlies-purple text-base leading-snug italic">
                      {postDestaque.titulo}
                    </h3>
                  </div>
                  <div className="px-4 py-3 flex-1 space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs">Público Alvo:</span>
                      <span className="text-slate-700 text-xs font-medium">{postDestaque.publicoAlvo || 'Geral'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Prazo Final:</span>
                      <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                        <AlarmClock className="w-3 h-3" />
                        {postDestaque.deadline ? new Date(postDestaque.deadline).toLocaleDateString('pt-BR') : '--'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Design &amp; Copy:</span>
                      <div className="flex -space-x-1.5">
                        {postDestaque.responsavelRoteiroId && (
                          <div title={`Roteiro: ${getNome(postDestaque.responsavelRoteiroId)}`} className="w-6 h-6 rounded-full bg-violet-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold cursor-help select-none">
                            {getInitials(postDestaque.responsavelRoteiroId)}
                          </div>
                        )}
                        {postDestaque.responsavelDesignId && (
                          <div title={`Design: ${getNome(postDestaque.responsavelDesignId)}`} className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold cursor-help select-none">
                            {getInitials(postDestaque.responsavelDesignId)}
                          </div>
                        )}
                        {!postDestaque.responsavelRoteiroId && !postDestaque.responsavelDesignId && (
                          <span className="text-[10px] text-slate-400 font-medium">Nenhum designado</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100">
                    <button className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors">
                      <Layout className="w-3.5 h-3.5" />
                      Revisar {postDestaque.tipoPost}
                    </button>
                  </div>
                </div>
              )}

              {/* Card 3: Hackathon */}
              {eventoDestaque && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover-card flex flex-col overflow-hidden">
                  <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="badge-tag bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">Missão Externa</span>
                        <span className="badge-tag text-slate-400 font-mono">// {eventoDestaque.tipoEvento}</span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Rocket className="w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                    <h3 className="font-bold text-girlies-purple text-base leading-snug">{eventoDestaque.titulo}</h3>
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{eventoDestaque.data ? new Date(eventoDestaque.data).toLocaleDateString('pt-BR') : '--'} • {eventoDestaque.horarioInicio || '--'} às {eventoDestaque.horarioFim || '--'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{eventoDestaque.local || 'Não definido'}</span>
                    </div>
                  </div>
                  {/* Logística */}
                  <div className="px-4 pb-3 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Logística GirliES</p>
                    </div>
                    
                    {localChecklistEvento.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Sem tarefas de logística listadas.</p>
                    ) : (
                      <MiniChecklist 
                        items={localChecklistEvento}
                        onToggle={(id) => toggleChecklistEvento(Number(id))}
                        showProgress={true}
                        variant="circle"
                      />
                    )}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100">
                    <button className="w-full flex items-center justify-center gap-2 bg-girlies-purple hover:bg-[#3d004d] text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors shadow-md shadow-girlies-purple/20">
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Acessar Painel de Logística
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Trilha Pedagógica ── */}
      <section className="pb-10 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookMarked className="w-4 h-4 text-girlies-purple" />
              <h2 className="font-bold text-girlies-purple">Trilha Pedagógica <span className="text-slate-400 font-normal">•</span> Semestre 2026.2</h2>
            </div>
            <span className="bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">{aulas.length} Aulas Registradas</span>
          </div>

          {/* Timeline list */}
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">Carregando cronograma...</div>
            ) : aulas.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-400 text-sm italic">Nenhuma aula registrada na trilha.</div>
            ) : (
              [...aulas].sort((a, b) => (a.semana || 0) - (b.semana || 0)).map((aula) => {
                const isPassada = (aula.semana || 0) < cicloAtivo;
                const isAtual = (aula.semana || 0) === cicloAtivo;
                const isConcluida = aula.status === 'Concluída';
                const isCancelada = aula.status === 'Cancelada';
                const isEmAberto = isPassada && !isConcluida && !isCancelada;

                let iconBg = 'bg-slate-100';
                let iconContent = <span className="text-slate-500 text-xs font-bold">{aula.semana ? String(aula.semana).padStart(2, '0') : '--'}</span>;
                let textColor = 'text-slate-400';
                let textLabel = aula.dataHora ? new Date(aula.dataHora).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '--';

                if (isAtual) {
                  iconBg = 'bg-girlies-purple shadow shadow-girlies-purple/30';
                  iconContent = <span className="text-white text-xs font-bold">{aula.semana ? String(aula.semana).padStart(2, '0') : '--'}</span>;
                  textColor = 'text-girlies-purple';
                  textLabel = 'Esta semana';
                } else if (isPassada) {
                  if (isConcluida) {
                    iconBg = 'bg-emerald-100';
                    iconContent = <Check className="w-4 h-4 text-emerald-600" />;
                    textColor = 'text-emerald-600';
                    textLabel = 'Concluída';
                  } else if (isCancelada) {
                    iconBg = 'bg-red-50';
                    iconContent = <X className="w-4 h-4 text-red-400" />;
                    textColor = 'text-red-400';
                    textLabel = 'Cancelada';
                  } else if (isEmAberto) {
                    iconBg = 'bg-amber-100';
                    iconContent = <AlertCircle className="w-4 h-4 text-amber-600" />;
                    textColor = 'text-amber-600';
                    textLabel = 'Em aberto';
                  }
                }

                return (
                  <div key={aula.id} className={`timeline-item px-6 py-4 flex items-start gap-4 ${isAtual ? 'bg-girlies-purple/5' : ''}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${iconBg}`}>
                      {iconContent}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-0.5">
                        <span className={`text-xs font-semibold ${textColor}`}>Semana {aula.semana || '--'}</span>
                        <span className="text-slate-300 text-xs">•</span>
                        <span className={`text-sm font-semibold ${isAtual ? 'text-girlies-purple' : 'text-slate-700'}`}>{aula.titulo}</span>
                        {isAtual && <span className="badge-tag bg-girlies-purple text-white px-2 py-0.5 rounded uppercase">Em Curso</span>}
                      </div>
                      <p className={`text-xs ${isPassada ? 'text-slate-500' : isAtual ? 'text-slate-500' : 'text-slate-400'}`}>
                        {aula.descricao || 'Sem descrição cadastrada.'}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold flex-shrink-0 mt-1 ${textColor} ${!isPassada && !isAtual ? 'font-normal' : ''}`}>
                      {textLabel}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer link */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <Link to="/aulas" className="text-girlies-purple text-sm font-semibold hover:text-[#3d004d] flex items-center gap-1.5 transition-colors">
              Ver ementa completa ({aulas.length * 3} horas curriculares estimadas)
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-xs text-slate-400 font-mono">GirliES CORE</span>
          </div>
        </div>
      </section>
    </>
  );
}