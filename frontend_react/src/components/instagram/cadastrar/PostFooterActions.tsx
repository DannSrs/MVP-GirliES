import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';

export function PostFooterActions() {
  const navigate = useNavigate();
  const { formData } = usePostForm();

  const handleSave = () => {
    // Aqui você integraria com a API real ou com o InstagramContext para salvar o Post.
    console.log('Post criado com sucesso:', formData);
    navigate('/instagram');
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-end gap-4 mt-6 mb-2 w-full">
      
      <div className="flex gap-4">
        <Link 
          to="/instagram"
          className="text-slate-500 hover:text-slate-800 text-sm font-bold px-4 py-2 transition-colors flex items-center justify-center"
        >
          Cancelar
        </Link>
        <button 
          onClick={handleSave}
          className="bg-girlies-purple hover:bg-[#3d004d] text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-girlies-purple/30 flex items-center gap-2.5 hover:-translate-y-0.5"
        >
          <ArrowRight className="w-5 h-5" />
          Criar Post
        </button>
      </div>
    </div>
  );
}
