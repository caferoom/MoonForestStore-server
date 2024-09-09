import { Module } from "@nestjs/common";
import { GoodsService } from "../../services/goods.service";
import { GoodsController } from "./goods.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Goods } from "src/entities/goods.entity";
import { GoodsSpecification } from "src/entities/goods_specification.entity";
import { GoodsSpecificationService } from "../../services/goodsSpecification.service";
import { CategoryService } from "../../services/category.service";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { Cart } from "src/entities/cart.entity";
import { SpecificationService } from "../../services/specification.service";
import { Specification } from "src/entities/specification.entity";
import { GoodsGalleryService } from "../../services/goodsGallery.service";
import { GoodsGallery } from "src/entities/goods_gallery.entity";
import { FreightTemplateService } from "../../services/freight_template.service";
import { FreightTemplate } from "src/entities/freight_template.entity";

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
