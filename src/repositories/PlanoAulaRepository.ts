import { PlanoAula } from '../models/PlanoAula';
import { IRepository } from './IRepository';

export class PlanoAulaRepository implements IRepository<PlanoAula> {
    private aulas: PlanoAula[] = [];

    findAll(): PlanoAula[] {
        return [...this.aulas];
    }

    findById(id: string): PlanoAula | undefined {
        return this.aulas.find((aula) => aula.id === id);
    }

    create(aula: PlanoAula): PlanoAula {
        this.aulas.push(aula);
        return aula;
    }

    update(id: string, changes: Partial<PlanoAula>): PlanoAula | undefined {
        const index = this.aulas.findIndex((aula) => aula.id === id);

        if (index === -1) {
            return undefined;
        }

        this.aulas[index] = { ...this.aulas[index], ...changes };
        return this.aulas[index];
    }

    delete(id: string): boolean {
        const index = this.aulas.findIndex((aula) => aula.id === id);

        if (index === -1) {
            return false;
        }

        this.aulas.splice(index, 1);
        return true;
    }
}