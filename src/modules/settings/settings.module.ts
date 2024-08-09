import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Settings } from "src/database/settings.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  providers: [SettingsService, JwtStrategy],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
