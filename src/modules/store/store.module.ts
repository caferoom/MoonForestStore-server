import { Module } from "@nestjs/common";
import { StoreService } from "../../services/store.service";
import { StoreController } from "./store.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { ShowSettings } from "src/entities_old/show_settings.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ShowSettings])],
  providers: [StoreService, JwtStrategy],
  controllers: [StoreController],
  exports: [StoreService],
})
export class StoreModule {}
