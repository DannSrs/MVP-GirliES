import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";
import { LinksAtividade } from "./LinksAtividade";

export class PostInstagram extends Atividade {
    public checklist: ChecklistItem[] = []
    public links: LinksAtividade[] = [];
    constructor(
        id: string,
        // tagCategoria: string,
        titulo: string,
        public descricao: string,
        public status: 'Ideia' | 'Em Produção' | 'Concluído' | 'Publicado',
        public tipoPost: 'Carrossel' | 'Stories' | 'Post' | 'Reels',
        public publicoAlvo: string,
        public deadline: Date,
        public responsavelRoteiroId: string,
        public responsavelDesignId: string,
    ) {
        super(id, /*tagCategoria,*/ titulo, 'POST');
    }
}