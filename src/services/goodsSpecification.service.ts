import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  IGoodsSpecificationCreateMembers,
  IGoodsSpecificationUpdateMembers,
  GoodsSpecification,
} from "src/entities_old/goods_specification.entity";

import { Repository } from "typeorm";

@Injectable()
export class GoodsSpecificationService extends BaseService<
  GoodsSpecification,
  IGoodsSpecificationCreateMembers,
  IGoodsSpecificationUpdateMembers
> {
  constructor(
    @InjectRepository(GoodsSpecification)
    private goodsSpecification: Repository<GoodsSpecification>,
  ) {
    super(goodsSpecification);
  }
}
