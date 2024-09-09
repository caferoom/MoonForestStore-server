import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegionService } from "../../services/region.service";

@Controller("common")
@UseGuards(AuthGuard("jwt"))
export class CommonController {
  constructor(private regionService: RegionService) {}

  @Get("getAllRegion")
  async getAllRegion() {
    return await this.regionService.getRegionsHierarchy();
  }
}
