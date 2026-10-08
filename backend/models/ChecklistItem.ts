export interface ChecklistItem {
  id: number;
  atividadeId: number;
  descricao: string;
  isCompleted: boolean;
}

export type CriarChecklistItemDTO = Omit<ChecklistItem, 'id' | 'atividadeId'>;