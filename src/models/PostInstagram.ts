import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";

export class PostInstagram extends Atividade {
    public checklist: ChecklistItem[] = []
  constructor(
    id: string,
    // tagCategoria: string,
    titulo: string,
    public descricao: string,
    public status: 'Ideia' | 'Em Produção' | 'Concluído' | 'Publicado',
    public tipoPost: 'Carrossel' | 'Stories' | 'Post' | 'Reels',
    public publicoAlvo: string,
    public deadline: Date,
    public responsavelRoteiro: string,
    public responsavelDesign: string,
  ) {
    super(id, /*tagCategoria,*/ titulo, 'POST');
  }
}