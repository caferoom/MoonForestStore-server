import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { OrderService } from "../../services/order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities_old/order.entity";
import { Settings } from "src/entities_old/settings.entity";
import { SettingsService } from "../../services/settings.service";
import { Region } from "src/entities_old/region.entity";
import { RegionService } from "../../services/region.service";
import { User } from "src/entities_old/user.entity";
import { UserService } from "../../services/users.service";
import { OrderGoods } from "src/entities_old/order_item.entity";
import { OrderGoodsService } from "../../services/order_goods.service";
import { OrderExpress } from "src/entities_old/order_express.entity";
import { OrderExpressService } from "../../services/order_express.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Settings, User, Region, OrderGoods, OrderExpress])],
  providers: [
    OrderService,
    SettingsService,
    UserService,
    RegionService,
    OrderGoodsService,
    OrderExpressService,
    JwtStrategy,
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
