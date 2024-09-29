import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "src/entities/address.entity";

import { Repository } from "typeorm";

@Injectable()
export class AddressService {
  public repository: Repository<Address>;

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {
    this.repository = addressRepository;
  }
}
