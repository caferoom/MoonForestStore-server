import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  ExceptAreaDetail,
  IExceptAreaDetailCreateMembers,
  IExceptAreaDetailUpdateMembers,
} from "src/entities/except_area_detail.entity";

import { Repository } from "typeorm";

@Injectable()
export class ExceptAreaDetailService extends BaseService<
  ExceptAreaDetail,
  IExceptAreaDetailCreateMembers,
  IExceptAreaDetailUpdateMembers
> {
  constructor(
    @InjectRepository(ExceptAreaDetail)
    private exceptAreaDetailRepository: Repository<ExceptAreaDetail>,
  ) {
    super(exceptAreaDetailRepository);
  }
}
