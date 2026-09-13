import { Atividade } from "./Atividade";
import { ChecklistItem, CriarChecklistItemDTO } from "./ChecklistItem";
import { LinksAtividade, CriarLinksAtividadeDTO } from "./LinksAtividade";

export interface EventoGeral extends Atividade {
  data: string;
  horarioInicio: string;
  horarioFim: string;
  local: string;
  capacidade: number;
  logisticsChecklist?: ChecklistItem[];
  links?: LinksAtividade[];
}

export interface CriarEventoGeralDTO extends Omit<EventoGeral, 'id' | 'logisticsChecklist' | 'links'> {
  logisticsChecklist?: CriarChecklistItemDTO[];
  links?: CriarLinksAtividadeDTO[];
}

export type AtualizarEventoGeralDTO = Partial<CriarEventoGeralDTO>;