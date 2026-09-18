import { useEventoForm } from '../../../contexts/EventoFormContext';
import type { EventoChecklistItem } from '../../../contexts/EventoFormContext';
import { GenericChecklistSection } from '../../shared/GenericChecklistSection';

export function LogisticaChecklistSection() {
  const { formData, updateField } = useEventoForm();
  
  const checklist = formData.logisticsChecklist;

  const toggleItem = (index: number) => {
    const updated = checklist.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    updateField('logisticsChecklist', updated);
  };

  const adicionarItem = (descricao: string) => {
    const novo: EventoChecklistItem = {
      descricao,
      isCompleted: false,
    };
    updateField('logisticsChecklist', [...checklist, novo]);
  };

  const removerItem = (index: number) => {
    updateField('logisticsChecklist', checklist.filter((_, i) => i !== index));
  };

  return (
    <GenericChecklistSection
      title="3. Logística & Apoio Campus"
      description="Selecione os recursos que a comissão interna do GirliES deve providenciar com antecedência:"
      items={checklist}
      onAdd={adicionarItem}
      onToggle={toggleItem}
      onRemove={removerItem}
      itemIdentifier="index"
    />
  );
}
