export interface Atividade {
  id?: number | string;
  titulo: string;
  tipo: 'AULA' | 'POST' | 'EVENTO';
}