import { Module } from "@nestjs/common";
import { AdService } from "../../services/ad.service";
import { AdController } from "./ad.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ad } from "src/entities/ad.entity";
import { Goods } from "src/entities_old/goods.entity";
import { GoodsService } from "../../services/goods.service";

@Module({
  imports: [TypeOrmModule.forFeature([Ad, Goods])],
  providers: [AdService, GoodsService, JwtStrategy],
  controllers: [AdController],
  exports: [AdService],
})
export class AdModule {}
