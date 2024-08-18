import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  ExceptArea,
  IExceptAreaCreateMembers,
  IExceptAreaUpdateMembers,
} from "src/database/except_area.entity";

import { Repository } from "typeorm";

@Injectable()
export class ExceptAreaService extends BaseService<
  ExceptArea,
  IExceptAreaCreateMembers,
  IExceptAreaUpdateMembers
> {
  constructor(
    @InjectRepository(ExceptArea)
    private exceptAreaRepository: Repository<ExceptArea>,
  ) {
    super(exceptAreaRepository);
  }
}
