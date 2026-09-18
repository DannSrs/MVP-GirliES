import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';
import { usePostForm } from '../../../contexts/PostFormContext';
import { Modal } from '../../Modal';
import { api } from '../../../services/api';

export function PostFooterActions() {
  const navigate = useNavigate();
  const { formData } = usePostForm();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirmSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      // Validation
      if (!formData.titulo) throw new Error('O título é obrigatório.');
      if (!formData.formato) throw new Error('O formato é obrigatório.');
      if (!formData.etapa) throw new Error('A etapa é obrigatória.');
      if (!formData.data) throw new Error('A data é obrigatória.');

      // Construct deadline ISO string
      // formData.data is expected to be 'YYYY-MM-DD'
      // formData.horario is expected to be 'HH:mm' or empty
      const dateTimeString = formData.horario 
        ? `${formData.data}T${formData.horario}:00` 
        : `${formData.data}T12:00:00`; // Default to noon if no time provided
      const deadline = new Date(dateTimeString).toISOString();

      const payload = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        tipoPost: formData.formato,
        status: formData.etapa,
        deadline,
        responsavelRoteiroId: formData.redacao ? Number(formData.redacao) : undefined,
        responsavelDesignId: formData.designer ? Number(formData.designer) : undefined,
        checklist: formData.checklist.map(c => ({ descricao: c.descricao, isCompleted: c.isCompleted }))
      };

      await api.criarPost(payload);
      
      // On success
      navigate('/instagram');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao criar o post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-end gap-4 mt-6 mb-2 w-full">
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            className="text-slate-500 hover:text-slate-800 text-sm font-bold px-4 py-2 transition-colors flex items-center justify-center"
          >
            Cancelar
          </button>
          <button 
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-girlies-purple hover:bg-[#3d004d] text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-girlies-purple/30 flex items-center gap-2.5 hover:-translate-y-0.5"
          >
            <ArrowRight className="w-5 h-5" />
            Criar Post
          </button>
        </div>
      </div>

      {/* Modal de Cancelamento */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancelar Cadastro"
        icon={<AlertTriangle className="w-5 h-5" />}
        iconBgClass="bg-red-100 text-red-600"
      >
        <div className="flex flex-col gap-6">
          <p className="text-sm text-slate-600 font-medium">
            Tem certeza que deseja cancelar o cadastro do post? Todos os dados preenchidos serão perdidos e não poderão ser recuperados.
          </p>
          <div className="flex items-center gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={() => setIsCancelModalOpen(false)}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => navigate('/instagram')}
              className="px-5 py-2.5 text-sm font-bold bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 rounded-xl transition-all"
            >
              Sim, descartar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmação de Cadastro */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => !isSubmitting && setIsSubmitModalOpen(false)}
        title="Confirmar Criação de Post"
        icon={<ArrowRight className="w-5 h-5" />}
      >
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-sm text-slate-700 font-medium mb-2">
              Você está prestes a criar o post:
            </p>
            <p className="text-base font-bold text-girlies-purple">
              {formData.titulo || 'Sem título definido'}
            </p>
            <div className="mt-3 flex flex-col gap-1 text-xs text-slate-500 font-mono">
              <div>Data: {formData.data || 'Não definida'} {formData.horario}</div>
              <div>Formato: {formData.formato}</div>
              <div>Etapa: {formData.etapa}</div>
            </div>
          </div>

          {submitError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold border border-red-100">
              {submitError}
            </div>
          )}

          <div className="flex items-center gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
            >
              Revisar
            </button>
            <button
              type="button"
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Criando...
                </>
              ) : (
                'Confirmar e Criar'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
