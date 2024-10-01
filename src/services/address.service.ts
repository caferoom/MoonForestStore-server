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

  async getAddressList(params: { page: number; pageSize: number; id: number }) {
    const { page = 1, pageSize = 10, id } = params;

    const [data, total] = await this.repository
      .createQueryBuilder()
      .where({ user_id: id })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      total,
      data,
    };
  }
}
