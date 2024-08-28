import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { FreightTemplateService } from "./freight_template.service";

@Controller("freightTemplate")
@UseGuards(AuthGuard("jwt"))
export class FreightTemplateController {
  constructor(private freightTemplateService: FreightTemplateService) {}
}
