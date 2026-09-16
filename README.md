# MVP GirliES

Este projeto gerencia as operações do GirliES (Painel de Extensão Universitária). 
A arquitetura é dividida em um back-end (Node.js + Express + SQLite) e dois front-ends (um estático original e um novo em React).

## Requisitos

- Node.js
- npm

## Instalação

Na pasta raiz do projeto, instale as dependências. Esse comando automaticamente instalará também as dependências do painel React:
```bash
npm install
```

## Como Rodar o Projeto

Para manter os logs organizados e evitar travamentos no terminal do Windows, o ideal é rodar o back-end e o front-end em abas (terminais) separadas:

### 1. Inicie a API (Back-end)
Abra o primeiro terminal na raiz do projeto e rode:
```bash
npm run dev
```
*(Isso iniciará o servidor na porta 3000)*

### 2. Inicie o Painel React (Front-end)
Abra um segundo terminal na raiz do projeto e rode:
```bash
npm run dev:react
```
*(Isso iniciará o Vite na porta 5173 e abrirá a nova interface)*
- **Painel Antigo (Estático):** Continua intacto. Para acessá-lo, basta abrir o arquivo `frontend/index.html` em seu navegador ou usar a extensão Live Server do VSCode.

> **Nota:** As chamadas da API do painel React estão configuradas para acessar a porta 3000 (Back-end) automaticamente através do proxy no `vite.config.ts`.

