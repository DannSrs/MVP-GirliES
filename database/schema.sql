-- 1. Usuários
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email LIKE '%@discente.ifpe.edu.br'),
    funcao_interna VARCHAR(120),
    curso VARCHAR(150),
    periodo VARCHAR(50),
    role VARCHAR(50) DEFAULT 'membro'
);

-- 2. Aulas
CREATE TABLE Aulas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(120),
    data_hora TIMESTAMP NOT NULL,
    local VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Planejada',
    link_plano_aula VARCHAR(255),
    link_slide VARCHAR(255),
    link_roteiro VARCHAR(255),
    google_event_id VARCHAR(255)
);

-- 3. Relacionamento muitos-para-muitos entre Aula e Usuário
--    Como no model a aula pode ter mais de um responsável.
CREATE TABLE Aula_Responsavel (
    aula_id INT NOT NULL REFERENCES Aulas(id) ON DELETE CASCADE,
    usuario_id INT NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
    PRIMARY KEY (aula_id, usuario_id)
);

-- 4. Conteúdo de Instagram
CREATE TABLE Conteudo_IG (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'Ideia',
    data_programada TIMESTAMP,
    tipo_post VARCHAR(50),
    publico_alvo VARCHAR(150),
    responsavel_roteiro INT REFERENCES Usuarios(id) ON DELETE SET NULL,
    responsavel_design INT REFERENCES Usuarios(id) ON DELETE SET NULL
);

-- 5. Eventos gerais
CREATE TABLE Eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora TIMESTAMP NOT NULL,
    local VARCHAR(255),
    duracao VARCHAR(100)
);

-- 6. Checklist genérico para qualquer atividade da aplicação
--    Mantém o conceito da classe Atividade no código, sem forçar uma tabela única para cada tipo.
CREATE TABLE Checklists (
    id SERIAL PRIMARY KEY,
    atividade_id VARCHAR(100) NOT NULL,
    tipo_atividade VARCHAR(20) NOT NULL CHECK (tipo_atividade IN ('AULA', 'POST', 'EVENTO')),
    descricao VARCHAR(255) NOT NULL,
    concluido BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Materiais e links de qualquer atividade
--    Alinha com a classe LinksAtividade do model.
CREATE TABLE LinksAtividade (
    id SERIAL PRIMARY KEY,
    atividade_id VARCHAR(100) NOT NULL,
    tipo_atividade VARCHAR(20) NOT NULL CHECK (tipo_atividade IN ('AULA', 'POST', 'EVENTO')),
    tipo VARCHAR(30) NOT NULL CHECK (tipo IN ('Material', 'Link Auxiliar')),
    titulo VARCHAR(255) NOT NULL,
    link TEXT NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);