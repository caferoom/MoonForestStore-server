import { Module } from "@nestjs/common";
import { ShipperService } from "./shipper.service";
import { ShipperController } from "./shipper.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shipper } from "src/database/shipper.entity";
import { SettingsService } from "../settings/settings.service";
import { Settings } from "src/database/settings.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Shipper, Settings])],
  providers: [ShipperService, SettingsService, JwtStrategy],
  controllers: [ShipperController],
  exports: [ShipperService],
})
export class ShipperModule {}
