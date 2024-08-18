import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  FreightTemplate,
  IFreightTemplateCreateMembers,
  IFreightTemplateUpdateMembers,
} from "src/database/freight_template.entity";
import { Repository } from "typeorm";

@Injectable()
export class FreightTemplateService extends BaseService<
  FreightTemplate,
  IFreightTemplateCreateMembers,
  IFreightTemplateUpdateMembers
> {
  constructor(
    @InjectRepository(FreightTemplate)
    private freightTemplateRepository: Repository<FreightTemplate>,
  ) {
    super(freightTemplateRepository);
  }
}
