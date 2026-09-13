import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";
import { LinksAtividade } from "./LinksAtividade";

export interface PlanoAula extends Atividade {
  id?: number | string;
  descricao?: string;
  dataHora: string;
  local?: string;
  status?: string;
  categoria?: string;
  linkPlanoAula?: string;
  checklist?: ChecklistItem[];
  links?: LinksAtividade[];
  responsaveis?: string[];
}

export type CriarChecklistItemDTO = Omit<ChecklistItem, 'id' | 'atividadeId'>;
export type CriarLinksAtividadeDTO = Omit<LinksAtividade, 'id' | 'atividadeId'>;

export interface CriarPlanoAulaDTO extends Omit<PlanoAula, 'id' | 'checklist' | 'links'> {
  checklist?: CriarChecklistItemDTO[];
  links?: CriarLinksAtividadeDTO[];
}

export type AtualizarPlanoAulaDTO = Partial<CriarPlanoAulaDTO>;