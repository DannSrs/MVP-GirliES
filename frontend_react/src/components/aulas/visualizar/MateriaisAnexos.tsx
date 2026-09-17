import { FolderOpen, MonitorPlay, ExternalLink, FileText, File, Link as LinkIcon, Gamepad2, ClipboardList, Video, Code2 } from 'lucide-react';
import type { PlanoAula } from '../../../services/api';

interface MateriaisAnexosProps {
  aula?: PlanoAula;
}

export function MateriaisAnexos({ aula }: MateriaisAnexosProps) {
  // Calculando recursos ativos
  let recursosAtivosCount = 0;
  if (aula?.linkSlide) recursosAtivosCount++;
  if (aula?.linkRoteiro) recursosAtivosCount++;
  if (aula?.linkPlanoAula) recursosAtivosCount++;
  if (aula?.links && aula.links.length > 0) {
    recursosAtivosCount += aula.links.length;
  }

  const getIconProps = (title: string) => {
    const val = (title || '').toLowerCase();
    if (val.includes('quiz') || val.includes('kahoot') || val.includes('jogo') || val.includes('game')) {
      return { Icon: Gamepad2, bgClass: 'bg-purple-100', textClass: 'text-purple-600' };
    }
    if (val.includes('form') || val.includes('feedback') || val.includes('pesquisa')) {
      return { Icon: ClipboardList, bgClass: 'bg-emerald-100', textClass: 'text-emerald-600' };
    }
    if (val.includes('doc') || val.includes('pdf') || val.includes('artigo') || val.includes('texto')) {
      return { Icon: FileText, bgClass: 'bg-blue-100', textClass: 'text-blue-600' };
    }
    if (val.includes('vídeo') || val.includes('video') || val.includes('youtube')) {
      return { Icon: Video, bgClass: 'bg-red-100', textClass: 'text-red-600' };
    }
    if (val.includes('slide') || val.includes('apresentação') || val.includes('canva') || val.includes('ppt')) {
      return { Icon: MonitorPlay, bgClass: 'bg-amber-100', textClass: 'text-amber-600' };
    }
    if (val.includes('código') || val.includes('code') || val.includes('github') || val.includes('repo')) {
      return { Icon: Code2, bgClass: 'bg-slate-200', textClass: 'text-slate-700' };
    }
    return { Icon: LinkIcon, bgClass: 'bg-indigo-50 border border-indigo-100', textClass: 'text-indigo-500' };
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
          <FolderOpen className="w-5 h-5 text-girlies-purple" />
          Materiais Pedagógicos & Anexos
        </h2>
        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
          {recursosAtivosCount} {recursosAtivosCount === 1 ? 'recurso ativo' : 'recursos ativos'}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {recursosAtivosCount === 0 && (
          <div className="text-center py-6 text-slate-400 text-sm font-medium">
            Nenhum material anexado a esta aula ainda.
          </div>
        )}

        {/* Canva (Slide) */}
        {aula?.linkSlide && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-girlies-purple/30 transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center shadow-sm">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 group-hover:text-girlies-purple transition-colors">Slide da Aula</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Apresentação principal da aula</span>
              </div>
            </div>
            <a
              href={aula.linkSlide}
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-girlies-purple text-slate-600 hover:text-girlies-purple text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider"
            >
              Abrir <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Notion (Roteiro) */}
        {aula?.linkRoteiro && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Roteiro da Aula</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Cronograma e detalhes para equipe</span>
              </div>
            </div>
            <a
              href={aula.linkRoteiro}
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-slate-400 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider"
            >
              Abrir <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* SUAP (Plano) */}
        {aula?.linkPlanoAula && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors group">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shadow-sm">
                <File className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">Plano de Ensino</span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5">Documento base da aula</span>
              </div>
            </div>
            <a
              href={aula.linkPlanoAula}
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-slate-400 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider"
            >
              Abrir <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Outros Links Dinâmicos */}
        {aula?.links && aula.links.map((link, index) => {
          const { Icon, bgClass, textClass } = getIconProps(link.titulo || link.tipo || '');
          return (
            <div key={index} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors group">
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${bgClass} ${textClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">{link.titulo || link.tipo || 'Link Auxiliar'}</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 max-w-[200px] truncate">{link.link}</span>
                </div>
              </div>
              <a
                href={link.link}
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-slate-200 hover:border-slate-400 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider"
              >
                Abrir <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
