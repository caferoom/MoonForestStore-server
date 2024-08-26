import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/database/cart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService, JwtStrategy],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
