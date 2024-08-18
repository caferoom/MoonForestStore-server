import { InternalServerErrorException } from "@nestjs/common";
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  ObjectId,
  QueryRunner,
  Repository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class BaseService<T, CI extends DeepPartial<T>, UI extends DeepPartial<T>> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async edit(id: number, entity: UI) {
    if (typeof id !== "number") {
      throw new InternalServerErrorException("未传递id");
    }
    const one = await this.findOneById(id);
    if (!one) {
      throw new InternalServerErrorException("不存在对应Id的实体");
    }

    // 遍历 entity 的属性并将值赋给 one
    for (const key of Object.keys(entity)) {
      if (entity[key] !== undefined) {
        one[key] = entity[key];
      }
    }

    return this.repository.save(one);
  }

  async update(
    criteria:
      | string
      | number
      | string[]
      | Date
      | ObjectId
      | FindOptionsWhere<T>
      | number[]
      | Date[]
      | ObjectId[],
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    return this.repository.update(criteria, partialEntity);
  }

  async findAndCount(options?: FindManyOptions<T>) {
    return this.repository.findAndCount(options);
  }

  async add(entity: CI) {
    return this.repository.save(this.repository.create(entity));
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
    return this.repository.findBy(where);
  }

  async findOneById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async find(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>): Promise<T[] | null> {
    return this.repository.find({ where });
  }

  async createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }
}
