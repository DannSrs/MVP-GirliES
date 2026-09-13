"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksAtividade = void 0;
class LinksAtividade {
    id;
    atividadeId;
    tipo;
    link;
    constructor(id, atividadeId, tipo, link) {
        this.id = id;
        this.atividadeId = atividadeId;
        this.tipo = tipo;
        this.link = link;
    }
}
exports.LinksAtividade = LinksAtividade;
