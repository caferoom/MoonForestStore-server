import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  IGoodsGalleryCreateMembers,
  IGoodsGalleryUpdateMembers,
  GoodsGallery,
} from "src/database/goods_gallery.entity";

import { Repository } from "typeorm";

@Injectable()
export class GoodsGalleryService extends BaseService<
  GoodsGallery,
  IGoodsGalleryCreateMembers,
  IGoodsGalleryUpdateMembers
> {
  constructor(
    @InjectRepository(GoodsGallery)
    private goodsGallery: Repository<GoodsGallery>,
  ) {
    super(goodsGallery);
  }
}
