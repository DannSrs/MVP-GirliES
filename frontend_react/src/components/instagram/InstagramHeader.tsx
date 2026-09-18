import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInstagram } from '../../contexts/InstagramContext';

export function InstagramHeader() {
  const { filterTag, setFilterTag, tasks } = useInstagram();
  
  const tasksArray = Object.values(tasks);
  const totalPosts = tasksArray.length;

  const getCount = (tag: string) => tasksArray.filter(t => t.tag === tag).length;

  const filters = [
    { label: 'Todos', value: null },
    { label: 'Carrossel', value: 'Carrossel' },
    { label: 'Reels', value: 'Reels' },
    { label: 'Post Estático', value: 'Post Estático' },
    { label: 'Story Interativo', value: 'Story Interativo' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-100 text-girlies-purple text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              INSTA LAB • IFPE
            </span>
            <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Feed Ativo
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
            Pipeline de Conteúdo <span className="text-girlies-purple">@girli.es</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            Fluxo editorial de publicações, carrosséis educativos, stories e reels para fortalecer garotas na Engenharia de Software.
          </p>
        </div>
        <Link to="/instagram/cadastrar" className="bg-[#4b006e] hover:bg-[#3a0055] transition-colors text-white text-sm font-medium py-2.5 px-5 rounded-full flex items-center gap-2 shadow-lg shadow-[#4b006e]/30">
          <Plus className="w-4 h-4" />
          Nova Ideia de Post
        </Link>
      </div>

      <div className="flex items-center gap-3 mt-6 flex-wrap">
        {filters.map(filter => {
          const isActive = filterTag === filter.value;
          const count = filter.value === null ? totalPosts : getCount(filter.value);
          const displayLabel = isActive ? `${filter.label} (${count})` : filter.label;
          
          return (
            <button 
              key={filter.label}
              onClick={() => setFilterTag(filter.value)}
              className={`${isActive ? 'bg-[#4b006e] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} text-xs font-semibold px-4 py-1.5 rounded-full transition-colors`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
