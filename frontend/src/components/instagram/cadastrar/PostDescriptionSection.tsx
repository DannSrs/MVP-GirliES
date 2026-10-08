import { AlignLeft } from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';

export function PostDescriptionSection() {
  const { formData, updateField } = usePostForm();
  
  const maxLength = 2200;
  const currentLength = formData.descricao.length;
  const isNearLimit = currentLength > 2000;
  const isAtLimit = currentLength >= maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      updateField('descricao', text);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="w-10 h-10 rounded-xl bg-girlies-purple/10 text-girlies-purple flex items-center justify-center shrink-0">
          <AlignLeft className="w-5 h-5" />
        </div>
        Descrição da Ideia / Legenda
      </h2>

      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
          Conteúdo <span className="text-red-500">*</span>
        </label>
        <textarea
          className={`w-full bg-slate-50 border text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-girlies-purple/50 focus:border-girlies-purple block p-3 transition-colors outline-none font-medium min-h-[160px] resize-y ${
            isAtLimit ? 'border-red-300' : 'border-slate-200'
          }`}
          placeholder="Escreva a legenda ou o roteiro detalhado do post aqui..."
          value={formData.descricao}
          onChange={handleChange}
        />
        <div className="flex justify-end mt-2">
          <span className={`text-[10px] font-bold ${
            isAtLimit ? 'text-red-500' : isNearLimit ? 'text-amber-500' : 'text-slate-400'
          }`}>
            {currentLength} / {maxLength}
          </span>
        </div>
      </div>
    </section>
  );
}
