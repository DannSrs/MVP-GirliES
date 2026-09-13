export interface LinksAtividade {
    id?: number | string;
    atividadeId?: number | string;
    tipo?: 'Material' | 'Link Auxiliar';
    titulo?: string;
    link: string;
}