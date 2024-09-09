import { Module } from "@nestjs/common";
import { CartService } from "../../services/cart.service";
import { CartController } from "./cart.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService, JwtStrategy],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
