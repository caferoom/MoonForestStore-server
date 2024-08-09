import { InternalServerErrorException } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

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

    this.repository.save(one);
  }

  async add(entity: CI) {
    this.repository.save(this.repository.create(entity));
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findOneById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async find(where: FindOptionsWhere<T>[] | FindOptionsWhere<T>): Promise<T[] | null> {
    return this.repository.find({ where });
  }
}
