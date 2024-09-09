import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  ShowSettings,
  IShowSettingsCreateMembers,
  IShowSettingsUpdateMembers,
} from "src/entities/show_settings.entity";
import { Repository } from "typeorm";

@Injectable()
export class StoreService extends BaseService<
  ShowSettings,
  IShowSettingsCreateMembers,
  IShowSettingsUpdateMembers
> {
  constructor(
    @InjectRepository(ShowSettings)
    private storeRepository: Repository<ShowSettings>,
  ) {
    super(storeRepository);
  }
}
