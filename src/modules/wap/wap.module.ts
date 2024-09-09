import { Module } from "@nestjs/common";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { WapController } from "./wap.controller";
import { GoodsService } from "../../services/goods.service";
import { CategoryService } from "../../services/category.service";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Cart } from "src/entities/cart.entity";
import { Category } from "src/entities/category.entity";
import { Goods } from "src/entities/goods.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Category, Cart, Product])],
  providers: [JwtStrategy, GoodsService, CategoryService, CartService, ProductService],
  controllers: [WapController],
  exports: [],
})
export class WapModule {}
