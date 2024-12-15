import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  IFreightTemplateCreateMembers,
  IFreightTemplateUpdateMembers,
  FreightTemplate,
} from "src/entities_old/freight_template.entity";

import { Repository } from "typeorm";

@Injectable()
export class FreightTemplateService extends BaseService<
  FreightTemplate,
  IFreightTemplateCreateMembers,
  IFreightTemplateUpdateMembers
> {
  constructor(
    @InjectRepository(FreightTemplate)
    private freightTemplate: Repository<FreightTemplate>,
  ) {
    super(freightTemplate);
  }
}
