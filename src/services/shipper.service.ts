import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shipper } from "src/entities_old/shipper.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShipperService {
  public repository: Repository<Shipper>;

  constructor(
    @InjectRepository(Shipper)
    private shipperRepository: Repository<Shipper>,
  ) {
    this.repository = shipperRepository;
  }
}
