import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IProductCreateMembers, IProductUpdateMembers, Product } from "src/entities/product.entity";

import { Repository } from "typeorm";

@Injectable()
export class ProductService extends BaseService<
  Product,
  IProductCreateMembers,
  IProductUpdateMembers
> {
  constructor(
    @InjectRepository(Product)
    private product: Repository<Product>,
  ) {
    super(product);
  }
}
