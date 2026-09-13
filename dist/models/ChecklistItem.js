"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItem = void 0;
class ChecklistItem {
    id;
    atividadeId;
    description;
    isCompleted;
    constructor(id, atividadeId, // Chave estrangeira que conecta ao Card (Lado '1')
    description, isCompleted) {
        this.id = id;
        this.atividadeId = atividadeId;
        this.description = description;
        this.isCompleted = isCompleted;
    }
    // Métodos de domínio específicos do item
    toggleStatus() {
        this.isCompleted = !this.isCompleted;
    }
}
exports.ChecklistItem = ChecklistItem;
