import { Module } from "@nestjs/common";
import { GoodsService } from "./goods.service";
import { GoodsController } from "./goods.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Goods } from "src/database/goods.entity";
import { GoodsSpecification } from "src/database/goods_specification.entity";
import { GoodsSpecificationService } from "../goodsSpecification/goodsSpecification.service";
import { CategoryService } from "../category/category.service";
import { Category } from "src/database/category.entity";
import { Product } from "src/database/product.entity";
import { ProductService } from "../product/product.service";

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Category, GoodsSpecification, Product])],
  providers: [
    GoodsService,
    GoodsSpecificationService,
    CategoryService,
    ProductService,
    JwtStrategy,
  ],
  controllers: [GoodsController],
  exports: [GoodsService],
})
export class GoodsModule {}
