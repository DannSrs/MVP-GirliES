export interface LinksAtividade {
    id: number;
    atividadeId: number;
    tipo: 'Material' | 'Link Auxiliar';
    titulo?: string;
    link: string;
}

export type CriarLinksAtividadeDTO = Omit<LinksAtividade, 'id' | 'atividadeId'>;