-- 1. Criação da tabela de Usuários (com restrição de domínio IFPE)
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email LIKE '%@discente.ifpe.edu.br')
);

-- 2. Criação da tabela do Módulo de Aulas
CREATE TABLE Aulas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    link_plano_aula VARCHAR(255),
    google_event_id VARCHAR(255),
    responsavel_id INT REFERENCES Usuarios(id) ON DELETE SET NULL
);

-- 3. Criação da tabela do Módulo do Instagram (Conteúdo IG)
CREATE TABLE Conteudo_IG (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'Ideia',
    data_programada TIMESTAMP,
    responsavel_gravacao_id INT REFERENCES Usuarios(id) ON DELETE SET NULL,
    responsavel_edicao_id INT REFERENCES Usuarios(id) ON DELETE SET NULL,
    responsavel_postagem_id INT REFERENCES Usuarios(id) ON DELETE SET NULL
);

-- 4. Criação da tabela do Módulo de Eventos
CREATE TABLE Eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data_hora TIMESTAMP NOT NULL
);

-- 5. Criação da tabela de Checklists (Compartilhada entre Aulas e Eventos)
CREATE TABLE Checklists (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    concluido BOOLEAN DEFAULT FALSE,
    aula_id INT REFERENCES Aulas(id) ON DELETE CASCADE,
    evento_id INT REFERENCES Eventos(id) ON DELETE CASCADE
);