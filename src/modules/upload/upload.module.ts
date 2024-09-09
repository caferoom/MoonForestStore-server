import { Module } from "@nestjs/common";
import { QiniuService } from "../../services/qiniu.service";
import { UploadController } from "./upload.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [],
  providers: [QiniuService, ConfigService, JwtStrategy],
  controllers: [UploadController],
  exports: [QiniuService, ConfigService],
})
export class UploadModule {}
