export abstract class Atividade {
  constructor(
    readonly id: string,
    //public tagCategoria: string, // ex: "LAB PRÁTICO - SEMANA 02"
    public titulo: string,
    public tipo: 'AULA' | 'POST' | 'EVENTO'
  ) {}
}