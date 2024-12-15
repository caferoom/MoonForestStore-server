import { Module } from "@nestjs/common";
import { UserService } from "../../services/users.service";
import { UsersController } from "./users.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { User } from "src/entities_old/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/entities_old/cart_item.entity";
import { CartService } from "../../services/cart.service";
import { Order } from "src/entities_old/order.entity";
import { OrderGoods } from "src/entities_old/order_item.entity";
import { Region } from "src/entities_old/region.entity";
import { OrderGoodsService } from "../../services/order_goods.service";
import { RegionService } from "../../services/region.service";
import { OrderService } from "../../services/order.service";
import { AddressService } from "../../services/address.service";
import { Address } from "src/entities_old/address.entity";
import { FootprintService } from "../../services/footprint.service";
import { FootPrint } from "src/entities/footprint.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order, OrderGoods, FootPrint, Address, Region])],
  providers: [
    UserService,
    FootprintService,
    CartService,
    OrderService,
    OrderGoodsService,
    AddressService,
    RegionService,
    JwtStrategy,
  ],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
