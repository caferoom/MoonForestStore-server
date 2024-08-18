import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  FreightTemplateDetail,
  IFreightTemplateDetailCreateMembers,
  IFreightTemplateDetailUpdateMembers,
} from "src/database/freight_template_detail.entity";

import { Repository } from "typeorm";

@Injectable()
export class FreightTemplateDetailService extends BaseService<
  FreightTemplateDetail,
  IFreightTemplateDetailCreateMembers,
  IFreightTemplateDetailUpdateMembers
> {
  constructor(
    @InjectRepository(FreightTemplateDetail)
    private freightTemplateDetail: Repository<FreightTemplateDetail>,
  ) {
    super(freightTemplateDetail);
  }
}
