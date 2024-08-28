import { Module } from "@nestjs/common";
import { GoodsGalleryService } from "./goodsGallery.service";
import { GoodsGalleryController } from "./goodsGallery.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoodsGallery } from "src/database/goods_gallery.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GoodsGallery])],
  providers: [GoodsGalleryService, JwtStrategy],
  controllers: [GoodsGalleryController],
  exports: [GoodsGalleryService],
})
export class GoodsGalleryModule {}
