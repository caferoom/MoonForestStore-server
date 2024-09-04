import { Module } from "@nestjs/common";
import { SpecificationService } from "./specification.service";
import { SpecificationController } from "./specification.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { Specification } from "src/database/specification.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/product.entity";
import { ProductService } from "../product/product.service";
import { GoodsSpecificationService } from "../goodsSpecification/goodsSpecification.service";
import { GoodsSpecification } from "src/database/goods_specification.entity";
import { GoodsService } from "../goods/goods.service";
import { Goods } from "src/database/goods.entity";
import { Cart } from "src/database/cart.entity";
import { CartService } from "../cart/cart.service";

@Module({
  imports: [TypeOrmModule.forFeature([Specification, Product, Goods, Cart, GoodsSpecification])],
  providers: [
    SpecificationService,
    ProductService,
    CartService,
    GoodsService,
    GoodsSpecificationService,
    JwtStrategy,
  ],
  controllers: [SpecificationController],
  exports: [SpecificationService],
})
export class SpecificationModule {}
