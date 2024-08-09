import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IRegionCreateMembers, IRegionUpdateMembers, Region } from "src/database/region.entity";
import { Repository } from "typeorm";

@Injectable()
export class RegionService extends BaseService<Region, IRegionCreateMembers, IRegionUpdateMembers> {
  constructor(
    @InjectRepository(Region)
    private shipperRepository: Repository<Region>,
  ) {
    super(shipperRepository);
  }
}
