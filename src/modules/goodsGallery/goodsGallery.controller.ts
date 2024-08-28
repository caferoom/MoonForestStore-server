import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { GoodsGalleryService } from "./goodsGallery.service";

@Controller("goodsGallery")
@UseGuards(AuthGuard("jwt"))
export class GoodsGalleryController {
  constructor(private goodsGalleryService: GoodsGalleryService) {}
}
