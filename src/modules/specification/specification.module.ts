import { Module } from "@nestjs/common";
import { SpecificationService } from "./specification.service";
import { SpecificationController } from "./specification.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { Specification } from "src/database/specification.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Specification])],
  providers: [SpecificationService, JwtStrategy],
  controllers: [SpecificationController],
  exports: [SpecificationService],
})
export class SpecificationModule {}
