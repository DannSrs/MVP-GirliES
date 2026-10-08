const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/app.db');

db.serialize(() => {
  db.run("INSERT INTO Conteudo_IG (titulo, descricao, status, data_programada, tipo_post, publico_alvo, responsavel_roteiro, responsavel_design) VALUES ('Post Mockado TSOA', 'Descrição mockada para visualização', 'Fazendo', '2026-10-15T10:00:00Z', 'Carrossel', 'Alunas Iniciantes', 1, 1)");
  
  db.run("INSERT INTO Aulas (titulo, descricao, categoria, data_hora, local, status, link_plano_aula, link_slide, link_roteiro) VALUES ('Aula de Reposição', 'Aula para teste', 'Backend', '2026-09-20T14:00:00Z', 'Lab 2', 'Em Preparação', '', '', '')");
  
  console.log("Seed concluído");
});
db.close();
