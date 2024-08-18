import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Settings,
  ISettingsCreateMembers,
  ISettingsUpdateMembers,
} from "src/database/settings.entity";
import { DeleteResult, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async edit(id: number, settings: ISettingsUpdateMembers) {
    if (typeof id !== "number") {
      throw new InternalServerErrorException("未传递id");
    }
    const one = await this.findOneById(id);
    if (!one) {
      throw new InternalServerErrorException("不存在对应Id的settings");
    }

    // 遍历 settings 的属性并将值赋给 one
    for (const key of Object.keys(settings)) {
      if (settings[key] !== undefined) {
        one[key] = settings[key];
      }
    }

    this.settingsRepository.save(one);
  }

  async add(settings: ISettingsCreateMembers) {
    this.settingsRepository.save(this.settingsRepository.create(settings));
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.settingsRepository.delete(id);
  }

  async findOneById(id: number): Promise<Settings | null> {
    return this.settingsRepository.findOneBy({ id });
  }

  async find(
    where: FindOptionsWhere<Settings>[] | FindOptionsWhere<Settings>,
  ): Promise<Settings[] | null> {
    return this.settingsRepository.find({ where });
  }
}
