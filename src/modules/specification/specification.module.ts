import { Module } from "@nestjs/common";
import { SpecificationService } from "../../services/specification.service";
import { SpecificationController } from "./specification.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { Specification } from "src/entities/specification.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities_old/product.entity";
import { ProductService } from "../../services/product.service";
import { GoodsSpecificationService } from "../../services/goodsSpecification.service";
import { GoodsSpecification } from "src/entities_old/goods_specification.entity";
import { GoodsService } from "../../services/goods.service";
import { Goods } from "src/entities_old/goods.entity";
import { Cart } from "src/entities_old/cart_item.entity";
import { CartService } from "../../services/cart.service";

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
