import { Module } from "@nestjs/common";
import { GoodsService } from "../../services/goods.service";
import { GoodsController } from "./goods.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Goods } from "src/entities_old/goods.entity";
import { GoodsSpecification } from "src/entities_old/goods_specification.entity";
import { GoodsSpecificationService } from "../../services/goodsSpecification.service";
import { GoodsCateGoriesService } from "../../services/goods_categories.service";
import { Goods_Categories } from "src/entities_old/goods_categories.entity";
import { Product } from "src/entities_old/product.entity";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { Cart } from "src/entities_old/cart_item.entity";
import { SpecificationService } from "../../services/specification.service";
import { Specification } from "src/entities/specification.entity";
import { GoodsGalleryService } from "../../services/goodsGallery.service";
import { GoodsGallery } from "src/entities_old/goods_gallery.entity";
import { FreightTemplateService } from "../../services/freight_template.service";
import { FreightTemplate } from "src/entities_old/freight_template.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Goods,
      Goods_Categories,
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
    GoodsCateGoriesService,
    CartService,
    ProductService,
    JwtStrategy,
  ],
  controllers: [GoodsController],
  exports: [GoodsService],
})
export class GoodsModule {}
