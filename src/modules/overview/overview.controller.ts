import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("Overview")
@UseGuards(AuthGuard("jwt"))
export class OverviewController {
}
