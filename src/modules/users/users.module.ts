import { Module } from "@nestjs/common";
import { UsersService } from "../../services/users.service";
import { UsersController } from "./users.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { User } from "src/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { CartService } from "../../services/cart.service";
import { Order } from "src/entities/order.entity";
import { OrderGoods } from "src/entities/order_goods.entity";
import { Region } from "src/entities/region.entity";
import { OrderGoodsService } from "../../services/order_goods.service";
import { RegionService } from "../../services/region.service";
import { OrderService } from "../../services/order.service";
import { AddressService } from "../../services/address.service";
import { Address } from "src/entities/address.entity";
import { FootprintService } from "../../services/footprint.service";
import { FootPrint } from "src/entities/footprint.entity";

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
