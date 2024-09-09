import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  Specification,
  ISpecificationCreateMembers,
  ISpecificationUpdateMembers,
} from "src/entities/specification.entity";
import { Repository } from "typeorm";

@Injectable()
export class SpecificationService extends BaseService<
  Specification,
  ISpecificationCreateMembers,
  ISpecificationUpdateMembers
> {
  constructor(
    @InjectRepository(Specification)
    private specificationRepository: Repository<Specification>,
  ) {
    super(specificationRepository);
  }
}
