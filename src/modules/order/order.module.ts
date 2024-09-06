import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/database/order.entity";
import { Settings } from "src/database/settings.entity";
import { SettingsService } from "../settings/settings.service";
import { Region } from "src/database/region.entity";
import { RegionService } from "../common/region.service";
import { User } from "src/database/user.entity";
import { UsersService } from "../users/users.service";
import { OrderGoods } from "src/database/order_goods.entity";
import { OrderGoodsService } from "./order_goods.service";
import { OrderExpress } from "src/database/order_express.entity";
import { OrderExpressService } from "./order_express.service";

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
