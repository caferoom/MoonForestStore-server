import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { User } from "src/database/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/database/cart.entity";
import { CartService } from "../cart/cart.service";
import { Order } from "src/database/order.entity";
import { OrderGoods } from "src/database/order_goods.entity";
import { Region } from "src/database/region.entity";
import { OrderGoodsService } from "./order_goods.service";
import { RegionService } from "../common/region.service";
import { OrderService } from "../order/order.service";
import { AddressService } from "../address/address.service";
import { Address } from "src/database/address.entity";
import { FootprintService } from "../footprint/footprint.service";
import { FootPrint } from "src/database/footprint.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order, OrderGoods, FootPrint, Address, Region])],
  providers: [
    UsersService,
    FootprintService,
    CartService,
    OrderService,
    OrderGoodsService,
    AddressService,
    RegionService,
    JwtStrategy,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
