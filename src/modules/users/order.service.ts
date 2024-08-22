import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Order, IOrderCreateMembers, IOrderUpdateMembers } from "src/database/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService extends BaseService<Order, IOrderCreateMembers, IOrderUpdateMembers> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
