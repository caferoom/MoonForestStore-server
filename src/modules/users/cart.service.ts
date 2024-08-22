import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { Cart, ICartCreateMembers, ICartUpdateMembers } from "src/database/cart.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService extends BaseService<Cart, ICartCreateMembers, ICartUpdateMembers> {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {
    super(cartRepository);
  }
}
