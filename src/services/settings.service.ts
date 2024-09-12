import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Settings } from "src/entities/settings.entity";
import { Repository } from "typeorm";

type PartialSenderInfo = Pick<
  Settings,
  | "Name"
  | "Tel"
  | "ProvinceName"
  | "CityName"
  | "ExpAreaName"
  | "Address"
  | "city_id"
  | "province_id"
  | "district_id"
>;

@Injectable()
export class SettingsService {
  public repository: Repository<Settings>;

  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {
    this.repository = settingsRepository;
  }

  async getSenderInfo() {
    return await this.repository.findOneBy({
      id: 1,
    });
  }

  async updateSenderInfo(info: PartialSenderInfo) {
    return await this.repository.update(
      {
        id: 1,
      },
      info,
    );
  }

  async getAutoDelivery() {
    const settings = await this.repository.findOneBy({
      id: 1,
    });
    return settings.autoDelivery;
  }

  async setAutoDelivery(autoDelivery: boolean) {
    return await this.repository.update(
      {
        id: 1,
      },
      {
        autoDelivery,
      },
    );
  }
}
