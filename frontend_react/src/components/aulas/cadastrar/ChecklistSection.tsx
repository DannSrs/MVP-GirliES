import { useAulaForm } from '../../../contexts/AulaFormContext';
import { GenericChecklistSection } from '../../shared/GenericChecklistSection';

export function ChecklistSection() {
  const { formData, updateField } = useAulaForm();
  
  const tarefas = formData.checklist || [];

  const handleAddTarefa = (descricao: string) => {
    const novaTarefa = {
      id: Date.now(), // Temporário
      descricao,
      isCompleted: false
    };
    updateField('checklist', [...tarefas, novaTarefa]);
  };

  const handleToggleTarefa = (id: string | number) => {
    updateField('checklist', tarefas.map(t =>
      String(t.id) === String(id) ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const handleRemoveTarefa = (id: string | number) => {
    updateField('checklist', tarefas.filter(t => String(t.id) !== String(id)));
  };

  return (
    <GenericChecklistSection
      title="4. Checklist Operacional & Pré-Aula"
      description="Defina as tarefas essenciais que a equipe deve concluir antes da aula:"
      items={tarefas}
      onAdd={handleAddTarefa}
      onToggle={handleToggleTarefa}
      onRemove={handleRemoveTarefa}
      itemIdentifier="id"
    />
  );
}
