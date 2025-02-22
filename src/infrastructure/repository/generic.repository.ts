import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../../domain/interfaces/repository/generic.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class GenericRepositoryImplementation<T>
  implements GenericRepository<T>
{
  constructor(
    protected readonly entityManager: EntityManager,
    protected readonly entityClass: { new (): T },
  ) {}

  async getAll(): Promise<T[]> {
    return this.entityManager.find(this.entityClass, {
      order: { id: 'ASC' },
    }) as Promise<T[]>;
  }

  async getById(id: number): Promise<T> {
    const entity = await this.entityManager.findOne(this.entityClass, {
      where: { id },
    });
    return entity as Promise<T>;
  }

  async create(data: T): Promise<T> {
    return this.entityManager.save(this.entityClass, data);
  }

  async update(data: T): Promise<T> {
    return this.entityManager.save(this.entityClass, data);
  }

  async delete(id: number): Promise<void> {
    await this.entityManager.delete(this.entityClass, id);
  }
}
