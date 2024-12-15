import { Module } from "@nestjs/common";
import { GoodsCateGoriesService } from "../../services/goods_categories.service";
import { CategoryController } from "./category.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Goods_Categories } from "src/entities_old/goods_categories.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Goods_Categories])],
  providers: [GoodsCateGoriesService, JwtStrategy],
  controllers: [CategoryController],
  exports: [GoodsCateGoriesService],
})
export class CategoryModule {}
