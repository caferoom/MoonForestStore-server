import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { GoodsSpecificationService } from "./goodsSpecification.service";

@Controller("goodsSpecification")
@UseGuards(AuthGuard("jwt"))
export class GoodsSpecificationController {
  constructor(private goodsSpecificationService: GoodsSpecificationService) {}
}
