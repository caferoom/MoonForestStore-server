import { Module } from "@nestjs/common";
import { GoodsSpecificationService } from "./goodsSpecification.service";
import { GoodsSpecificationController } from "./goodsSpecification.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodsSpecification } from "src/database/goods_specification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GoodsSpecification])],
  providers: [GoodsSpecificationService, JwtStrategy],
  controllers: [GoodsSpecificationController],
  exports: [GoodsSpecificationService],
})
export class GoodsSpecificationModule {}
