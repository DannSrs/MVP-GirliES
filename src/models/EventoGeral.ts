import { Atividade } from "./Atividade";
import { ChecklistItem } from "./ChecklistItem";

export class EventoGeral extends Atividade {
  public logisticsChecklist: ChecklistItem[] = [];

  constructor(
    id: string,
    // tagCategoria: string,
    titulo: string,
    public durationInfo: string,
    public location: string
  ) {
    super(id, /*tagCategoria,*/ titulo, 'EVENTO');
  }

  addLogisticsItem(item: ChecklistItem): void {
    this.logisticsChecklist.push(item);
  }

  getLogisticsProgress(): number {
    if (this.logisticsChecklist.length === 0) return 0;
    
    const completed = this.logisticsChecklist.filter(item => item.isCompleted).length;
    return (completed / this.logisticsChecklist.length) * 100;
  }
}