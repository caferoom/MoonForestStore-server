import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Region } from "src/entities_old/region.entity";
import { RegionService } from "../../services/region.service";

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [JwtStrategy, RegionService],
  controllers: [CommonController],
  exports: [RegionService],
})
export class CommonModule {}
