import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";
import { LinksAtividade } from "./LinksAtividade";

export interface PostInstagram extends Atividade {
    descricao: string;
    status: 'Ideia' | 'Em Produção' | 'Concluído' | 'Publicado';
    tipoPost: 'Carrossel' | 'Stories' | 'Post' | 'Reels';
    publicoAlvo: string;
    deadline: Date | string;
    responsavelRoteiro: string;
    responsavelDesign: string;
    checklist?: ChecklistItem[];
    links?: LinksAtividade[];
}