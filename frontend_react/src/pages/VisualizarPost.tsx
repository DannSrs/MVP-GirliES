import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, type PostInstagram } from '../services/api';
import { 
  ArrowLeft, 
  CalendarDays, 
  CheckCircle2,
  Circle,
  Link as LinkIcon,
  ExternalLink,
  Edit2,
  ArrowRightLeft,
  Check,
  ChevronDown
} from 'lucide-react';

export function VisualizarPost() {
  const { id } = useParams();
  const [post, setPost] = useState<PostInstagram | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!post) return;
    try {
      const updated = await api.atualizarPost(post.id, { status: newStatus });
      setPost(updated);
      setIsStatusMenuOpen(false);
    } catch (err) {
      console.error('Erro ao atualizar status', err);
      alert('Erro ao atualizar status.');
    }
  };

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        if (id && id !== 'cadastrar') {
          const posts = await api.getPosts();
          const found = posts.find(p => p.id === Number(id));
          if (found) setPost(found);
        }
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-8 h-8 rounded-full border-4 border-girlies-purple border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-500">Post não encontrado.</p>
        <Link to="/instagram" className="text-girlies-purple hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Kanban
        </Link>
      </div>
    );
  }

  // Helpers para o layout
  const numChecklistCompleted = post.checklist?.filter(c => c.isCompleted).length || 0;
  const numChecklistTotal = post.checklist?.length || 0;
  const progressPercent = numChecklistTotal > 0 ? Math.round((numChecklistCompleted / numChecklistTotal) * 100) : 0;

  const dataPublicacao = new Date(post.deadline);
  const dataFormatada = dataPublicacao.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const diaSemana = dataPublicacao.toLocaleDateString('pt-BR', { weekday: 'long' });

  // Mocking links since it might not be in the backend model yet, but the form supports it
  const linksMock = [
    { titulo: 'canva.com/design/girli-es-social-ki', url: '#' },
    { titulo: 'drive.google.com/girlies/posts/git-', url: '#' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto pr-2 pb-6 bg-[#fafafa]">
      
      {/* HEADER SUPERIOR */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-500 tracking-wider uppercase">
            <Link to="/" className="hover:text-girlies-purple">workspace</Link>
            <span className="text-slate-300">›</span>
            <span className="text-girlies-purple">painel</span>
            <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full lowercase">
              • Semestre 2026.2
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link to="/instagram" className="text-indigo-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Pipeline Instagram (Kanban)
          </Link>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            PIPELINE_ID // #POST-2026-IG-{post.id.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* BLOCO DE TÍTULO (BRANCO) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              {post.status || 'Ideia'}
            </span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 border border-slate-200">
              <span className="w-3 h-3 rounded bg-slate-200"></span>
              {post.tipoPost}
            </span>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2 leading-tight">
            {post.titulo}
          </h1>
          <p className="text-sm font-bold text-indigo-400/80 uppercase tracking-widest font-mono">
            Semestre<br/>2026.2
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link to={`/instagram/${post.id}/editar`} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-full text-xs font-bold transition-colors">
            <Edit2 className="w-3.5 h-3.5" /> Editar Post
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
              onBlur={() => setTimeout(() => setIsStatusMenuOpen(false), 200)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-full text-xs font-bold transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" /> Mover Etapa <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            {isStatusMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {['Backlog', 'Produção'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleUpdateStatus(opt)}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-girlies-purple transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {post.status !== 'Pronto' && (
            <button 
              onClick={() => handleUpdateStatus('Pronto')}
              className="flex items-center gap-2 bg-[#3d004d] hover:bg-purple-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-purple-900/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Aprovar Post
            </button>
          )}
        </div>
      </div>

      {/* GRID DE CONTEÚDO */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* COLUNA ESQUERDA (Mais Larga) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* 01 Informações da Publicação */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm">
                  01
                </span>
                <h2 className="text-lg font-bold text-slate-800">Informações da Publicação</h2>
              </div>
              <span className="bg-emerald-200 text-emerald-800 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                ESSENCIAL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Formato de Conteúdo</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                    <span className="w-3 h-3 border-2 border-current rounded-sm"></span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 leading-tight">{post.tipoPost}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Etapa Atual no Kanban</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  <span className="text-sm font-semibold text-slate-700 leading-tight">{post.status || 'Ideia'}</span>
                </div>
              </div>
            </div>

            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">Responsáveis Cadastrados</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {post.responsavelRoteiroId ? `R${post.responsavelRoteiroId}` : '??'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">Equipe Roteiro</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Redação / Roteiro</span>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {post.responsavelDesignId ? `D${post.responsavelDesignId}` : '??'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">Equipe Design</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Designer Responsável</span>
                </div>
              </div>
            </div>
          </section>

          {/* 02 Descrição do Conteúdo */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm">
                02
              </span>
              <h2 className="text-lg font-bold text-slate-800">Descrição do Conteúdo</h2>
            </div>
            
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">Anotações / Observações</p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-xs font-mono text-slate-600 leading-relaxed whitespace-pre-wrap">
              {post.descricao || 'Nenhuma descrição fornecida.'}
            </div>
          </section>

        </div>

        {/* COLUNA DIREITA (Mais Estreita) */}
        <div className="flex flex-col gap-6">
          
          {/* 03 Cronograma & Prazos */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm">
                  03
                </span>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">Cronograma &<br/>Prazos</h2>
              </div>
              <span className="bg-purple-100 text-purple-800 text-[9px] font-bold font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-full text-center">
                Semestre<br/>2026.2
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">Data de Publicação</p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <CalendarDays className="w-4 h-4 text-purple-600" />
                  {dataFormatada}
                </div>
              </div>
              <span className="bg-white border border-slate-200 text-slate-500 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {diaSemana.split('-')[0]}
              </span>
            </div>
          </section>

          {/* 04 Links do Arquivo */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm">
                  04
                </span>
                <h2 className="text-lg font-bold text-slate-800">Links do Arquivo</h2>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase font-mono">Figma / Drive</span>
            </div>

            <div className="flex flex-col gap-3">
              {linksMock.map((link, idx) => (
                <a key={idx} href={link.url} className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl border border-slate-100 group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <LinkIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs font-bold font-mono text-slate-600 truncate">{link.titulo}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-600 flex-shrink-0" />
                </a>
              ))}
            </div>
          </section>

          {/* Checklist Operacional */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-lg font-bold text-slate-800 leading-tight">Checklist<br/>Operacional</h2>
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-purple-700 transition-all" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  {numChecklistCompleted} de {numChecklistTotal} concluídas
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {(!post.checklist || post.checklist.length === 0) ? (
                <p className="text-xs text-slate-400 italic">Nenhuma tarefa registrada.</p>
              ) : (
                post.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {item.isCompleted ? (
                        <div className="w-4 h-4 rounded bg-[#3d004d] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded border-2 border-slate-300"></div>
                      )}
                    </div>
                    <span className={`text-xs font-semibold ${item.isCompleted ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                      {item.descricao}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
