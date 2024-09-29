import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptArea } from "src/entities/except_area.entity";

import { Repository } from "typeorm";

@Injectable()
export class ExceptAreaService {
  public repository: Repository<ExceptArea>;

  constructor(
    @InjectRepository(ExceptArea)
    private exceptRepository: Repository<ExceptArea>,
  ) {
    this.repository = exceptRepository;
  }
}
