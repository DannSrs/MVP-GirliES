export interface IRepository<T, CreateDTO = Omit<T, 'id'>, UpdateDTO = Partial<CreateDTO>> {
    findAll(): Promise<T[]>;
    findById(id: number | string): Promise<T | undefined>;
    create(entity: CreateDTO): Promise<T>;
    update(id: number | string, changes: UpdateDTO): Promise<T | undefined>;
    delete(id: number | string): Promise<boolean>;
}