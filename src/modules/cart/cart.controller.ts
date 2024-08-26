import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CartService } from "./cart.service";

@Controller("cart")
@UseGuards(AuthGuard("jwt"))
export class CartController {
  constructor(private cartService: CartService) {}
}
