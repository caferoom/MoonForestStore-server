import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { OrderService } from "../../services/order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { Settings } from "src/entities/settings.entity";
import { SettingsService } from "../../services/settings.service";
import { Region } from "src/entities/region.entity";
import { RegionService } from "../../services/region.service";
import { User } from "src/entities/user.entity";
import { UsersService } from "../../services/users.service";
import { OrderGoods } from "src/entities/order_goods.entity";
import { OrderGoodsService } from "../../services/order_goods.service";
import { OrderExpress } from "src/entities/order_express.entity";
import { OrderExpressService } from "../../services/order_express.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Settings, User, Region, OrderGoods, OrderExpress])],
  providers: [
    OrderService,
    SettingsService,
    UsersService,
    RegionService,
    OrderGoodsService,
    OrderExpressService,
    JwtStrategy,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
