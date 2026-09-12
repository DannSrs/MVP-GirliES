export class ChecklistItem {
  constructor(
    public id: string,
    public atividadeId: string, // Chave estrangeira que conecta ao Card (Lado '1')
    public description: string,
    public isCompleted: boolean
  ) {}

  // Métodos de domínio específicos do item
  toggleStatus(): void {
    this.isCompleted = !this.isCompleted;
  }
}