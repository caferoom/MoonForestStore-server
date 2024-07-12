import { Module } from "@nestjs/common";
import { OverviewService } from "./Overview.service";
import { OverviewController } from "./Overview.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

@Module({
  providers: [OverviewService, JwtStrategy],
  controllers: [OverviewController],
  exports: [OverviewService],
})
export class OverviewModule {}
