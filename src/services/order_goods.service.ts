import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  IOrderGoodsCreateMembers,
  IOrderGoodsUpdateMembers,
  OrderGoods,
} from "src/entities/order_goods.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderGoodsService extends BaseService<
  OrderGoods,
  IOrderGoodsCreateMembers,
  IOrderGoodsUpdateMembers
> {
  constructor(
    @InjectRepository(OrderGoods)
    private orderGoodsRepository: Repository<OrderGoods>,
  ) {
    super(orderGoodsRepository);
  }
}
