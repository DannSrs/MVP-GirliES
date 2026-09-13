import { ChecklistItem } from './ChecklistItem';
import { LinksAtividade } from './LinksAtividade';

export interface PlanoAula {
  id: number;
  titulo: string;
  descricao?: string;
  categoria?: string;
  dataHora: string;
  local?: string;
  status?: string;
  linkPlanoAula?: string;
  checklist?: ChecklistItem[];
  links?: LinksAtividade[];
  responsaveisId?: number[];
}

export type CriarPlanoAulaDTO = Omit<PlanoAula, 'id' | 'checklist' | 'links'> & {
  checklist?: Omit<ChecklistItem, 'id' | 'atividadeId'>[];
  links?: Omit<LinksAtividade, 'id' | 'atividadeId'>[];
};

export type AtualizarPlanoAulaDTO = Partial<CriarPlanoAulaDTO>;