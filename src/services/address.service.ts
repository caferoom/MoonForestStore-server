import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IAddressCreateMembers, IAddressUpdateMembers, Address } from "src/entities/address.entity";

import { Repository } from "typeorm";

@Injectable()
export class AddressService extends BaseService<
  Address,
  IAddressCreateMembers,
  IAddressUpdateMembers
> {
  constructor(
    @InjectRepository(Address)
    private address: Repository<Address>,
  ) {
    super(address);
  }
}
