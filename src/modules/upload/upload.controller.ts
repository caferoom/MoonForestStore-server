import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { QiniuService } from "./qiniu.service";
import { ConfigService } from "@nestjs/config";

@Controller("upload")
@UseGuards(AuthGuard("jwt"))
export class UploadController {
  constructor(
    private qiniuService: QiniuService,
    private configService: ConfigService,
  ) {}

  @Post("getUploadToken")
  async getUploadToken() {
    const token = await this.qiniuService.createUploadToken();
    const url = await this.qiniuService.getUploadUrl();
    return {
      token,
      url,
    };
  }
}
