import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import {
  FootPrint,
  IFootPrintCreateMembers,
  IFootPrintUpdateMembers,
} from "src/entities/footprint.entity";
import { Repository } from "typeorm";

@Injectable()
export class FootprintService extends BaseService<
  FootPrint,
  IFootPrintCreateMembers,
  IFootPrintUpdateMembers
> {
  constructor(
    @InjectRepository(FootPrint)
    private footprintRepository: Repository<FootPrint>,
  ) {
    super(footprintRepository);
  }
}
