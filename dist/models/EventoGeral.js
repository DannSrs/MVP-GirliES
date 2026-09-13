"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoGeral = void 0;
const Atividade_1 = require("./Atividade");
class EventoGeral extends Atividade_1.Atividade {
    durationInfo;
    location;
    logisticsChecklist = [];
    constructor(id, 
    // tagCategoria: string,
    titulo, durationInfo, location) {
        super(id, /*tagCategoria,*/ titulo, 'EVENTO');
        this.durationInfo = durationInfo;
        this.location = location;
    }
    addLogisticsItem(item) {
        this.logisticsChecklist.push(item);
    }
    getLogisticsProgress() {
        if (this.logisticsChecklist.length === 0)
            return 0;
        const completed = this.logisticsChecklist.filter(item => item.isCompleted).length;
        return (completed / this.logisticsChecklist.length) * 100;
    }
}
exports.EventoGeral = EventoGeral;
