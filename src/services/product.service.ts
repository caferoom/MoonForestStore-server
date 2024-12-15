import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities_old/product.entity";

import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  public repository: Repository<Product>;

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.repository = productRepository;
  }
}
