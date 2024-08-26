import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AddressService } from "./address.service";

@Controller("address")
@UseGuards(AuthGuard("jwt"))
export class AddressController {
  constructor(private addressService: AddressService) {}
}
