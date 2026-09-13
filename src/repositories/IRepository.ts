export interface IRepository<T extends { id: string }> {
    findAll(): T[];
    findById(id: string): T | undefined;
    create(entity: T): T;
    update(id: string, changes: Partial<T>): T | undefined;
    delete(id: string): boolean;
}