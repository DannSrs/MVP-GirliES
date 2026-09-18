import { usePostForm } from '../../../contexts/PostFormContext';
import { GenericChecklistSection } from '../../shared/GenericChecklistSection';

export function PostChecklistSection() {
  const { formData, updateField } = usePostForm();
  
  const tarefas = formData.checklist || [];

  const handleAddTarefa = (descricao: string) => {
    const novaTarefa = {
      id: Date.now().toString(),
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
      title="4. Checklist de Tarefas"
      description="Defina as tarefas essenciais que a equipe deve concluir antes da publicação do post:"
      items={tarefas}
      onAdd={handleAddTarefa}
      onToggle={handleToggleTarefa}
      onRemove={handleRemoveTarefa}
      itemIdentifier="id"
    />
  );
}
