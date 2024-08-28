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
import { CartService } from "../cart/cart.service";
import { Cart } from "src/database/cart.entity";
import { SpecificationService } from "../specification/specification.service";
import { Specification } from "src/database/specification.entity";
import { GoodsGalleryService } from "../goodsGallery/goodsGallery.service";
import { GoodsGallery } from "src/database/goods_gallery.entity";
import { FreightTemplateService } from "../freight_template/freight_template.service";
import { FreightTemplate } from "src/database/freight_template.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Goods,
      Category,
      Cart,
      GoodsSpecification,
      GoodsGallery,
      FreightTemplate,
      Specification,
      Product,
    ]),
  ],
  providers: [
    GoodsService,
    GoodsSpecificationService,
    GoodsGalleryService,
    SpecificationService,
    FreightTemplateService,
    CategoryService,
    CartService,
    ProductService,
    JwtStrategy,
  ],
  controllers: [GoodsController],
  exports: [GoodsService],
})
export class GoodsModule {}
