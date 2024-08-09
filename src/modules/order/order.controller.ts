import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("order")
export class orderController {}
