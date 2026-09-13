"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInstagram = void 0;
const Atividade_1 = require("./Atividade");
class PostInstagram extends Atividade_1.Atividade {
    descricao;
    status;
    tipoPost;
    publicoAlvo;
    deadline;
    responsavelRoteiroId;
    responsavelDesignId;
    checklist = [];
    links = [];
    constructor(id, 
    // tagCategoria: string,
    titulo, descricao, status, tipoPost, publicoAlvo, deadline, responsavelRoteiroId, responsavelDesignId) {
        super(id, /*tagCategoria,*/ titulo, 'POST');
        this.descricao = descricao;
        this.status = status;
        this.tipoPost = tipoPost;
        this.publicoAlvo = publicoAlvo;
        this.deadline = deadline;
        this.responsavelRoteiroId = responsavelRoteiroId;
        this.responsavelDesignId = responsavelDesignId;
    }
}
exports.PostInstagram = PostInstagram;
