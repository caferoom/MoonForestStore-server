import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  IOrderExpressCreateMembers,
  IOrderExpressUpdateMembers,
  OrderExpress,
} from "src/database/order_express.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderExpressService extends BaseService<
  OrderExpress,
  IOrderExpressCreateMembers,
  IOrderExpressUpdateMembers
> {
  constructor(
    @InjectRepository(OrderExpress)
    private orderExpressRepository: Repository<OrderExpress>,
  ) {
    super(orderExpressRepository);
  }
}
