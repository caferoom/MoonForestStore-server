import { Module } from "@nestjs/common";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { WapController } from "./wap.controller";
import { GoodsService } from "../../services/goods.service";
import { GoodsCateGoriesService } from "../../services/goods_categories.service";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Cart } from "src/entities/cart.entity";
import { Goods_Categories } from "src/entities/goods_categories.entity";
import { Goods } from "src/entities/goods.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Goods_Categories, Cart, Product])],
  providers: [JwtStrategy, GoodsService, GoodsCateGoriesService, CartService, ProductService],
  controllers: [WapController],
  exports: [],
})
export class WapModule {}
