import { Module } from "@nestjs/common";
import { FreightTemplateService } from "./freight_template.service";
import { FreightTemplateController } from "./freight_template.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FreightTemplate } from "src/database/freight_template.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FreightTemplate])],
  providers: [FreightTemplateService, JwtStrategy],
  controllers: [FreightTemplateController],
  exports: [FreightTemplateService],
})
export class FreightTemplateModule {}
