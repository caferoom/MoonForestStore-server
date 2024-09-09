import { Module } from "@nestjs/common";
import { AdminService } from "../../services/admin.service";
import { AdminController } from "./admin.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { Admin } from "src/entities/admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService, JwtStrategy],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
