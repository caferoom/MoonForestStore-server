import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IShipperCreateMembers, IShipperUpdateMembers, Shipper } from "src/entities/shipper.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShipperService extends BaseService<
  Shipper,
  IShipperCreateMembers,
  IShipperUpdateMembers
> {
  constructor(
    @InjectRepository(Shipper)
    private shipperRepository: Repository<Shipper>,
  ) {
    super(shipperRepository);
  }
}
