import {
  ClipboardList, Code2, FileText, Gamepad2, Link2, MonitorPlay, Trash2, Video
} from 'lucide-react';

export interface CustomLink {
  id: string;
  titulo: string;
  url: string;
}

interface CustomLinkItemProps {
  link: CustomLink;
  onUpdate: (id: string, field: keyof CustomLink, value: string) => void;
  onRemove: (id: string) => void;
}

export function CustomLinkItem({ link, onUpdate, onRemove }: CustomLinkItemProps) {
  // Logic for dynamic icon and styles
  const getIconProps = (title: string) => {
    const val = title.toLowerCase();

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

    // Default
    return { Icon: Link2, bgClass: 'bg-girlies-purple/10', textClass: 'text-girlies-purple' };
  };

  const { Icon, bgClass, textClass } = getIconProps(link.titulo);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3 group items-center hover:border-girlies-purple/30 transition-colors cursor-text">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-colors duration-300 ${bgClass} ${textClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
        <input
          type="text"
          value={link.titulo}
          onChange={(e) => onUpdate(link.id, 'titulo', e.target.value)}
          placeholder="Título do link (ex: Quiz Kahoot)"
          className="text-xs font-bold text-slate-700 w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder-slate-400"
        />
        <input
          type="url"
          value={link.url}
          onChange={(e) => onUpdate(link.id, 'url', e.target.value)}
          placeholder="https://"
          className="text-[10px] text-slate-500 w-full bg-transparent border-none p-0 focus:ring-0 focus:outline-none placeholder-slate-400 font-mono"
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(link.id)}
        className="text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
