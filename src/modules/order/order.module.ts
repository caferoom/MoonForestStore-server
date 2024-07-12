import { Module } from "@nestjs/common";
import { orderService } from "./order.service";
import { orderController } from "./order.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

@Module({
  providers: [orderService, JwtStrategy],
  controllers: [orderController],
  exports: [orderService],
})
export class orderModule {}
