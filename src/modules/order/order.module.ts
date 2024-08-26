import { Module } from "@nestjs/common";
import { orderController } from "./order.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { OrderService } from "./order.service";

@Module({
  providers: [OrderService, JwtStrategy],
  controllers: [orderController],
  exports: [OrderService],
})
export class orderModule {}
