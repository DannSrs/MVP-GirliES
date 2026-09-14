import { ChecklistItem, CriarChecklistItemDTO } from "./ChecklistItem";
import { LinksAtividade, CriarLinksAtividadeDTO } from "./LinksAtividade";

export interface PostInstagram {
  id: number;
  titulo: string;
  descricao?: string;
  status?: 'Ideia' | 'Em Produção' | 'Concluído' | 'Publicado';
  tipoPost: 'Carrossel' | 'Stories' | 'Post' | 'Reels';
  publicoAlvo?: string;
  deadline: string; // ISO date string
  responsavelRoteiroId?: number;
  responsavelDesignId?: number;
  checklist?: ChecklistItem[];
  links?: LinksAtividade[];
  semana?: number;
}


export interface CriarPostInstagramDTO extends Omit<PostInstagram, 'id' | 'checklist' | 'links'> {
  checklist?: CriarChecklistItemDTO[];
  links?: CriarLinksAtividadeDTO[];
}

export type AtualizarPostInstagramDTO = Partial<CriarPostInstagramDTO>;
