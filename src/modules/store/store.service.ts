import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ShowSettings,
  IShowSettingsCreateMembers,
  IShowSettingsUpdateMembers,
} from "src/database/show_settings.entity";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(ShowSettings)
    private storeRepository: Repository<ShowSettings>,
  ) {}

  async edit(id: number, store: IShowSettingsUpdateMembers) {
    if (typeof id !== "number") {
      throw new InternalServerErrorException("未传递id");
    }
    const one = await this.findOneById(id);
    if (!one) {
      throw new InternalServerErrorException("不存在对应Id的store");
    }

    // 遍历 store 的属性并将值赋给 one
    for (const key of Object.keys(store)) {
      if (store[key] !== undefined) {
        one[key] = store[key];
      }
    }

    this.storeRepository.save(one);
  }

  async add(store: IShowSettingsCreateMembers) {
    this.storeRepository.save(this.storeRepository.create(store));
  }

  async remove(id: number): Promise<void> {
    await this.storeRepository.delete(id);
  }

  async findOneById(id: number): Promise<ShowSettings | null> {
    return this.storeRepository.findOneBy({ id });
  }

  async find(
    where: FindOptionsWhere<ShowSettings>[] | FindOptionsWhere<ShowSettings>,
  ): Promise<ShowSettings[] | null> {
    return this.storeRepository.find({ where });
  }
}
