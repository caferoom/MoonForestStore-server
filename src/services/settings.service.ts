import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  Settings,
  ISettingsCreateMembers,
  ISettingsUpdateMembers,
} from "src/entities/settings.entity";
import { Repository } from "typeorm";

@Injectable()
export class SettingsService extends BaseService<
  Settings,
  ISettingsCreateMembers,
  ISettingsUpdateMembers
> {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {
    super(settingsRepository);
  }
}
