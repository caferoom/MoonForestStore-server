import { Module } from "@nestjs/common";
import { NoticeService } from "../../services/notice.service";
import { NoticeController } from "./notice.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notice } from "src/entities/notice.entity";
import { Settings } from "src/entities/settings.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  providers: [NoticeService, JwtStrategy],
  controllers: [NoticeController],
  exports: [NoticeService],
})
export class NoticeModule {}
