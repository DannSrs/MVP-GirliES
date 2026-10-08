import { Link as LinkIcon, Plus } from 'lucide-react';
import { usePostForm, type PostLinkItem } from '../../../contexts/PostFormContext';
import { CustomLinkItem } from '../../aulas/cadastrar/CustomLinkItem';

export function PostAssignmentSection() {
  const { formData, updateField } = usePostForm();

  const handleAddLink = () => {
    const newLink: PostLinkItem = {
      id: Date.now().toString(),
      titulo: '',
      url: ''
    };
    updateField('links', [...formData.links, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    updateField('links', formData.links.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: string, field: keyof PostLinkItem, value: string) => {
    updateField('links', formData.links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-slate-400" />
          Links Úteis (Referências, Figma, Drive)
        </h2>
        <button 
          type="button"
          onClick={handleAddLink}
          className="text-girlies-purple hover:text-[#3d004d] text-xs font-bold flex items-center gap-1.5 hover:bg-girlies-purple/5 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Link
        </button>
      </div>

      {formData.links.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {formData.links.map((link) => (
            <CustomLinkItem 
              key={link.id}
              link={link}
              onUpdate={handleLinkChange as any}
              onRemove={handleRemoveLink}
            />
          ))}
        </div>
      )}
    </section>
  );
}
