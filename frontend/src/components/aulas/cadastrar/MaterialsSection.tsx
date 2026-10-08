import { BookOpen, FileText, FolderCode, Link as LinkIcon, MonitorPlay, Plus } from 'lucide-react';
import type { CustomLink } from './CustomLinkItem';
import { CustomLinkItem } from './CustomLinkItem';
import { useAulaForm } from '../../../contexts/AulaFormContext';
import type { LinksAtividade } from '../../../services/api';

export function MaterialsSection() {
  const { formData, updateField } = useAulaForm();

  const handleAddLink = () => {
    const novoLink: LinksAtividade = {
      id: Date.now(), // Temporário para a key do React, não deve ser enviado se mock
      tipo: 'Link Auxiliar',
      titulo: '',
      link: ''
    };
    updateField('links', [...formData.links, novoLink]);
  };

  const handleUpdateLink = (id: string | number, field: keyof CustomLink, value: string) => {
    // Adapter mapping 'url' to 'link' for the API interface
    const apiField = field === 'url' ? 'link' : field;

    updateField('links', formData.links.map(link =>
      String(link.id) === String(id) ? { ...link, [apiField]: value } : link
    ));
  };

  const handleRemoveLink = (id: string | number) => {
    updateField('links', formData.links.filter(link => String(link.id) !== String(id)));
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FolderCode className="w-5 h-5" />
          </div>
          3. Materiais Pedagógicos & Links Oficiais
        </h2>
        <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-widest uppercase border border-slate-200">Etapa 03</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider flex items-center justify-between">
            Slide da Aula (Canva / Drive / PPT)
          </label>
          <div className="relative group">
            <MonitorPlay className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
            <input
              type="url"
              value={formData.linkSlide}
              onChange={(e) => updateField('linkSlide', e.target.value)}
              placeholder="https://canva.com/design/girliES-sem07-slides"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider flex items-center justify-between">
            Plano de Aula Oficial (PDF / Link)
          </label>
          <div className="relative group">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
            <input
              type="url"
              value={formData.linkPlanoAula}
              onChange={(e) => updateField('linkPlanoAula', e.target.value)}
              placeholder="https://suap.ifpe.edu.br/documentos/girliES-plano-aula-07-2026.2.pdf"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-8">
        <label className="text-xs font-semibold text-slate-600 font-mono uppercase tracking-wider">
          Roteiro da Aula / Dinâmica Detalhada
        </label>
        <div className="relative group">
          <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-girlies-purple transition-colors" />
          <input
            type="url"
            value={formData.linkRoteiro}
            onChange={(e) => updateField('linkRoteiro', e.target.value)}
            placeholder="https://notion.so/girliES/Roteiro-Dinamica-Tamagotchi-POO"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-girlies-purple/30 focus:border-girlies-purple transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-slate-400" />
            Links Complementares & Dinâmicas (Quiz, Kahoot, Form)
          </h3>
          <button
            type="button"
            onClick={handleAddLink}
            className="text-girlies-purple hover:text-[#3d004d] text-xs font-bold flex items-center gap-1.5 hover:bg-girlies-purple/5 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Link Personalizado
          </button>
        </div>

        {formData.links.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {formData.links.map(link => (
              <CustomLinkItem
                key={link.id}
                link={{ id: String(link.id), titulo: link.titulo || '', url: link.link }}
                onUpdate={handleUpdateLink}
                onRemove={handleRemoveLink}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
