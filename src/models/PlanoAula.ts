import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";
import { LinksAtividade } from "./LinksAtividade";

export class PlanoAula extends Atividade {
    public checklist: ChecklistItem[] = [];
    public links: LinksAtividade[] = [];

    constructor(
        id: string,
        titulo: string,
        public descricao: string,
        public dateTime: string,
        public local: string,
        public responsaveisId: string[]
    ) {
    super(id, titulo, 'AULA');
  }

}