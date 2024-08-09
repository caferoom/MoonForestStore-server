import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Region } from "src/database/region.entity";
import { RegionService } from "./region.service";

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [JwtStrategy, RegionService],
  controllers: [CommonController],
  exports: [RegionService],
})
export class CommonModule {}
