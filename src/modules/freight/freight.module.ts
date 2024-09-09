import { Module } from "@nestjs/common";
import { FreightTemplateService } from "../../services/freightTemplate.service";
import { FreightController } from "./freight.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { FreightTemplate } from "src/entities/freight_template.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExceptArea } from "src/entities/except_area.entity";
import { ExceptAreaService } from "../../services/exceptArea.service";
import { Region } from "src/entities/region.entity";
import { RegionService } from "../../services/region.service";
import { ExceptAreaDetail } from "src/entities/except_area_detail.entity";
import { ExceptAreaDetailService } from "../../services/exceptAreaDetail.service";
import { FreightTemplateDetail } from "src/entities/freight_template_detail.entity";
import { FreightTemplateGroup } from "src/entities/freight_template_group.entity";
import { FreightTemplateGroupService } from "../../services/freightTemplateGroup.service";
import { FreightTemplateDetailService } from "../../services/freightTemplateDetail.service";

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
