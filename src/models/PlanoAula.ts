import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";

export class PlanoAula extends Atividade {
    public checklist: ChecklistItem[] = [];
    constructor(
        id: string,
        // tagCategoria: string,
        titulo: string,
        public dateTime: string,
        public local: string,
        public responsavel: string[]
    ) {
    super(id, titulo, 'AULA');
  }

}