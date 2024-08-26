import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  ICategoryCreateMembers,
  ICategoryUpdateMembers,
  Category,
} from "src/database/category.entity";

import { Repository } from "typeorm";

@Injectable()
export class CategoryService extends BaseService<
  Category,
  ICategoryCreateMembers,
  ICategoryUpdateMembers
> {
  constructor(
    @InjectRepository(Category)
    private category: Repository<Category>,
  ) {
    super(category);
  }
}
