import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IAdCreateMembers, IAdUpdateMembers, Ad } from "src/database/ad.entity";

import { Repository } from "typeorm";

@Injectable()
export class AdService extends BaseService<Ad, IAdCreateMembers, IAdUpdateMembers> {
  constructor(
    @InjectRepository(Ad)
    private ad: Repository<Ad>,
  ) {
    super(ad);
  }
}
