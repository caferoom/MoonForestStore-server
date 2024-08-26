import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FootprintService } from "./footprint.service";

@Controller("footprint")
@UseGuards(AuthGuard("jwt"))
export class FootprintController {
  constructor(private footprintService: FootprintService) {}
}
