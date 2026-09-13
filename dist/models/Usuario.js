"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    id;
    nome;
    email;
    funcaoInterna;
    curso;
    periodo;
    role;
    constructor(id, nome, email, funcaoInterna, curso, periodo, role) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.funcaoInterna = funcaoInterna;
        this.curso = curso;
        this.periodo = periodo;
        this.role = role;
    }
}
exports.Usuario = Usuario;
