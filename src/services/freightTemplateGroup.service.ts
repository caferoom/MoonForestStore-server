import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  FreightTemplateGroup,
  IFreightTemplateGroupCreateMembers,
  IFreightTemplateGroupUpdateMembers,
} from "src/entities/freight_template_group.entity";

import { Repository } from "typeorm";

@Injectable()
export class FreightTemplateGroupService extends BaseService<
  FreightTemplateGroup,
  IFreightTemplateGroupCreateMembers,
  IFreightTemplateGroupUpdateMembers
> {
  constructor(
    @InjectRepository(FreightTemplateGroup)
    private freightTemplateGroup: Repository<FreightTemplateGroup>,
  ) {
    super(freightTemplateGroup);
  }
}
