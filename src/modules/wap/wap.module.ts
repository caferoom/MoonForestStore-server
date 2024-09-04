import { Module } from "@nestjs/common";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { WapController } from "./wap.controller";
import { GoodsService } from "../goods/goods.service";
import { CategoryService } from "../category/category.service";
import { CartService } from "../cart/cart.service";
import { ProductService } from "../product/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/product.entity";
import { Cart } from "src/database/cart.entity";
import { Category } from "src/database/category.entity";
import { Goods } from "src/database/goods.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Category, Cart, Product])],
  providers: [JwtStrategy, GoodsService, CategoryService, CartService, ProductService],
  controllers: [WapController],
  exports: [],
})
export class WapModule {}
