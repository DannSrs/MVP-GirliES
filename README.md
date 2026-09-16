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

Criamos um atalho para facilitar o desenvolvimento. Agora, com um único comando, você inicia **tanto o Back-end quanto o Front-end React** simultaneamente:

```bash
npm run dev
```

### O que acontece quando você roda esse comando:
- **API Back-end:** Iniciada em `http://localhost:3000` (com auto-reload).
- **Painel Novo (React):** Iniciado em `http://localhost:5173` pelo Vite.
- **Painel Antigo (Estático):** Continua intacto. Para acessá-lo, basta abrir o arquivo `frontend/index.html` em seu navegador ou usar a extensão Live Server do VSCode.

> **Nota:** As chamadas da API do painel React estão configuradas para acessar a porta 3000 (Back-end) automaticamente através do proxy no `vite.config.ts`.

