import { useState } from 'react';
import { AlertTriangle, CalendarCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAulaForm } from '../../../contexts/AulaFormContext';
import { Modal } from '../../Modal';

export function FooterActions() {
  const navigate = useNavigate();
  const { submitForm, isSubmitting, formData, isEditing } = useAulaForm();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleConfirmSubmit = async () => {
    setSubmitError(null);
    try {
      await submitForm();
      // On success, redirect to /aulas
      navigate('/aulas');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro desconhecido ao agendar aula.');
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-end gap-4 mt-6 mb-2 w-full">
        <button
          type="button"
          onClick={() => setIsCancelModalOpen(true)}
          className="text-slate-500 hover:text-slate-800 text-sm font-bold px-4 py-2 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => {
            setSubmitError(null);
            setIsSubmitModalOpen(true);
          }}
          className="bg-girlies-purple hover:bg-[#3d004d] text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-girlies-purple/30 flex items-center gap-2.5 hover:-translate-y-0.5"
        >
          <CalendarCheck className="w-5 h-5" />
          {isEditing ? 'Salvar Alterações' : 'Confirmar e Agendar Aula'}
        </button>
      </div>

      {/* Modal de Cancelamento */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title={isEditing ? "Cancelar Edição" : "Cancelar Cadastro"}
        icon={<AlertTriangle className="w-5 h-5" />}
        iconBgClass="bg-red-100 text-red-600"
      >
        <div className="flex flex-col gap-6">
          <p className="text-sm text-slate-600 font-medium">
            Tem certeza que deseja cancelar {isEditing ? 'a edição' : 'o cadastro'}? Todos os dados preenchidos serão perdidos e não poderão ser recuperados.
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
              onClick={() => navigate('/aulas')}
              className="px-5 py-2.5 text-sm font-bold bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 rounded-xl transition-all"
            >
              Sim, descartar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmação de Agendamento */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => !isSubmitting && setIsSubmitModalOpen(false)}
        title={isEditing ? "Confirmar Alterações" : "Confirmar Agendamento"}
        icon={<CalendarCheck className="w-5 h-5" />}
      >
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-sm text-slate-700 font-medium mb-2">
              Você está prestes a {isEditing ? 'salvar as alterações da' : 'agendar a'} aula:
            </p>
            <p className="text-base font-bold text-girlies-purple">
              {formData.titulo || 'Sem título definido'}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span>Data: {formData.dataHora}</span>
              <span>•</span>
              <span>Local: {formData.local}</span>
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Processando...
                </>
              ) : (
                isEditing ? 'Salvar' : 'Agendar'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
