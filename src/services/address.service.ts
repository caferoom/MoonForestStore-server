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

  async getAddressList(params: {
    page: number;
    pageSize: number;
    id: number;
    sortField?: string;
    sortType?: "ASC" | "DESC";
  }) {
    const { page = 1, pageSize = 10, id, sortField = "is_default", sortType = "DESC" } = params;

    const [data, total] = await this.repository
      .createQueryBuilder()
      .where({ user_id: id })
      .orderBy(sortField, sortType)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      total,
      data,
    };
  }

  async setDefaultAddress(params: { userId: number; recordId: number }) {
    const { userId, recordId } = params;

    await this.repository.update(
      {
        user_id: userId,
      },
      {
        is_default: false,
      },
    );

    await this.repository.update({ user_id: userId, id: recordId }, { is_default: true });
  }
}
