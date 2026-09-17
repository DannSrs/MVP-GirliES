import { ChecklistItem, CriarChecklistItemDTO } from './ChecklistItem';
import { LinksAtividade, CriarLinksAtividadeDTO } from './LinksAtividade';

export interface PlanoAula {
  id: number;
  titulo: string;
  descricao?: string;
  categoria?: string;
  dataHora: string;
  local?: string;
  status?: 'Em Preparação' | 'Confirmada' | 'Concluída' | 'Cancelada';
  linkPlanoAula?: string;
  linkSlide?: string;
  linkRoteiro?: string;
  checklist?: ChecklistItem[];
  links?: LinksAtividade[];
  responsaveisId?: number[];
  semana?: number;
}

export type CriarPlanoAulaDTO = Omit<PlanoAula, 'id' | 'checklist' | 'links'> & {
  checklist?: CriarChecklistItemDTO[];
  links?: CriarLinksAtividadeDTO[];
};

export type AtualizarPlanoAulaDTO = Partial<CriarPlanoAulaDTO>;