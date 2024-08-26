import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IGoodsCreateMembers, IGoodsUpdateMembers, Goods } from "src/database/goods.entity";

import { Repository } from "typeorm";

@Injectable()
export class GoodsService extends BaseService<Goods, IGoodsCreateMembers, IGoodsUpdateMembers> {
  constructor(
    @InjectRepository(Goods)
    private goods: Repository<Goods>,
  ) {
    super(goods);
  }
}
