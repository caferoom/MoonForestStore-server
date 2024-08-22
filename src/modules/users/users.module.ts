import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { User } from "src/database/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/database/cart.entity";
import { CartService } from "./cart.service";
import { Order } from "src/database/order.entity";
import { OrderService } from "./order.service";
import { OrderGoods } from "src/database/order_goods.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order, OrderGoods])],
  providers: [UsersService, CartService, OrderService, OrderGoods, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
