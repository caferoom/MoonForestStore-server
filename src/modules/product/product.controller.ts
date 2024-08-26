import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ProductService } from "./product.service";

@Controller("product")
@UseGuards(AuthGuard("jwt"))
export class ProductController {
  constructor(private productService: ProductService) {}
}
