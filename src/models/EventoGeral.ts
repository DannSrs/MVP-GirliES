import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";

export interface EventoGeral extends Atividade {
  durationInfo: string;
  location: string;
  logisticsChecklist?: ChecklistItem[];
}