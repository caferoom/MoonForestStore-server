import { Module } from "@nestjs/common";
import { FreightTemplateService } from "./freightTemplate.service";
import { FreightController } from "./freight.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { FreightTemplate } from "src/database/freight_template.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExceptArea } from "src/database/except_area.entity";
import { ExceptAreaService } from "./exceptArea.service";
import { Region } from "src/database/region.entity";
import { RegionService } from "../common/region.service";
import { ExceptAreaDetail } from "src/database/except_area_detail.entity";
import { ExceptAreaDetailService } from "./exceptAreaDetail.service";
import { FreightTemplateDetail } from "src/database/freight_template_detail.entity";
import { FreightTemplateGroup } from "src/database/freight_template_group.entity";
import { FreightTemplateGroupService } from "./freightTemplateGroup.service";
import { FreightTemplateDetailService } from "./freightTemplateDetail.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FreightTemplate,
      FreightTemplateDetail,
      FreightTemplateGroup,
      ExceptArea,
      Region,
      ExceptAreaDetail,
    ]),
  ],
  providers: [
    FreightTemplateService,
    FreightTemplateGroupService,
    FreightTemplateDetailService,
    ExceptAreaService,
    RegionService,
    ExceptAreaDetailService,
    JwtStrategy,
  ],
  controllers: [FreightController],
  exports: [
    FreightTemplateService,
    ExceptAreaService,
    RegionService,
    ExceptAreaDetailService,
    FreightTemplateGroupService,
    FreightTemplateDetailService,
  ],
})
export class FreightModule {}
