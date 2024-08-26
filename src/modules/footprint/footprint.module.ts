import { Module } from "@nestjs/common";
import { FootprintService } from "./footprint.service";
import { FootprintController } from "./footprint.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { FootPrint } from "src/database/footprint.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([FootPrint])],
  providers: [FootprintService, JwtStrategy],
  controllers: [FootprintController],
  exports: [FootprintService],
})
export class FootprintModule {}
