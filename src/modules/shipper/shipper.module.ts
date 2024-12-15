import { Module } from "@nestjs/common";
import { ShipperService } from "../../services/shipper.service";
import { ShipperController } from "./shipper.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shipper } from "src/entities_old/shipper.entity";
import { SettingsService } from "../../services/settings.service";
import { Settings } from "src/entities_old/settings.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Shipper, Settings])],
  providers: [ShipperService, SettingsService, JwtStrategy],
  controllers: [ShipperController],
  exports: [ShipperService],
})
export class ShipperModule {}
