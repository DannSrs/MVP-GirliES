"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atividade = void 0;
class Atividade {
    id;
    titulo;
    tipo;
    constructor(id, 
    //public tagCategoria: string, // ex: "LAB PRÁTICO - SEMANA 02"
    titulo, tipo) {
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
    }
}
exports.Atividade = Atividade;
