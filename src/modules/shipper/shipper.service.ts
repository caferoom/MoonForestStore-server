import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IShipperCreateMembers, IShipperUpdateMembers, Shipper } from "src/database/shipper.entity";
import { DeleteResult, FindOptionsWhere, QueryRunner, Repository } from "typeorm";

@Injectable()
export class ShipperService {
  constructor(
    @InjectRepository(Shipper)
    private shipperRepository: Repository<Shipper>,
  ) {}

  async edit(id: number, shipper: IShipperUpdateMembers) {
    if (typeof id !== "number") {
      throw new InternalServerErrorException("未传递id");
    }
    const one = await this.findOneById(id);
    if (!one) {
      throw new InternalServerErrorException("不存在对应Id的shipper");
    }

    // 遍历 shipper 的属性并将值赋给 one
    for (const key of Object.keys(shipper)) {
      if (shipper[key] !== undefined) {
        one[key] = shipper[key];
      }
    }

    this.shipperRepository.save(one);
  }

  async add(shipper: IShipperCreateMembers) {
    return this.shipperRepository.save(this.shipperRepository.create(shipper));
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.shipperRepository.delete(id);
  }

  async findOneById(id: number): Promise<Shipper | null> {
    return this.shipperRepository.findOneBy({ id });
  }

  async find(
    where: FindOptionsWhere<Shipper>[] | FindOptionsWhere<Shipper>,
  ): Promise<Shipper[] | null> {
    return this.shipperRepository.find({ where });
  }

  async createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
    return this.shipperRepository.createQueryBuilder(alias, queryRunner);
  }
}
