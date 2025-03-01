export interface GenericRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}
