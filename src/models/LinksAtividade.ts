export class LinksAtividade {
    constructor(
        public id: string,
        public atividadeId: string,
        public tipo: 'Material' | 'Link Auxiliar',
        public link: string
    ) {}
}