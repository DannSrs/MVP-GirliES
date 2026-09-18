import { 
  Info,
  Columns3, 
  Clapperboard, 
  Image as ImageIcon, 
  BarChart3
} from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';

const FORMATS = [
  { id: 'Carrossel (8 slides)', title: 'Carrossel Educativo', subtitle: '8 a 10 slides didáticos', Icon: Columns3 },
  { id: 'Reels / Vídeo Curto', title: 'Reels / Vídeo Curto', subtitle: 'Dica rápida ou trend', Icon: Clapperboard },
  { id: 'Post Estático', title: 'Post Estático', subtitle: 'Comunicado ou infográfico', Icon: ImageIcon },
  { id: 'Story Interativo', title: 'Story Interativo', subtitle: 'Caixa ou enquete técnica', Icon: BarChart3 }
];

export function PostBasicInfoSection() {
  const { formData, updateField } = usePostForm();

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        Informações Básicas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
            Título do Post <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-girlies-purple/50 focus:border-girlies-purple block p-3 transition-colors outline-none font-medium"
            placeholder="Ex: Como foi a Acolhida das Calouras 2026.2"
            value={formData.titulo}
            onChange={(e) => updateField('titulo', e.target.value)}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
            Formato do Conteúdo <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FORMATS.map((format) => {
              const isSelected = formData.formato === format.id;
              
              return (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => updateField('formato', format.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left border ${
                    isSelected 
                      ? 'bg-girlies-purple/5 border-girlies-purple shadow-sm' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-white text-girlies-purple border border-girlies-purple/20' : 'bg-white text-slate-500 border border-slate-200'
                  }`}>
                    <format.Icon className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-0.5 ${isSelected ? 'text-girlies-purple' : 'text-slate-700'}`}>
                      {format.title}
                    </h4>
                    <p className={`text-xs ${isSelected ? 'text-[#4b006e]/70 font-medium' : 'text-slate-500'}`}>
                      {format.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
            Etapa no Kanban <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-girlies-purple/50 focus:border-girlies-purple block p-3 transition-colors outline-none font-medium"
            value={formData.etapa}
            onChange={(e) => updateField('etapa', e.target.value)}
          >
            <option value="Backlog / Ideias">Backlog / Ideias</option>
            <option value="Em Produção / Design">Em Produção / Design</option>
            <option value="Pronto / Aprovado">Pronto / Aprovado</option>
          </select>
        </div>
      </div>
    </section>
  );
}
