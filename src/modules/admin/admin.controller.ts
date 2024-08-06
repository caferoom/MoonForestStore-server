import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminService } from "./admin.service";
import * as dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { Admin } from "src/database/admin.entity";

@Controller("admin")
@UseGuards(AuthGuard("jwt"))
export class AdminController {
  constructor(private adminService: AdminService) {}

  // @UseGuards(AuthGuard("jwt"))
  // @Get("profile")
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @Get()
  async index() {
    const data: Admin[] | null = await this.adminService.find({ where: { is_delete: false } });
    if (data) {
      const clone = cloneDeep(data);
      for (const item of clone) {
        if (item.last_login_time != 0) {
          (item.last_login_time as any) = dayjs(Number(item.last_login_time)).format(
            "YYYY-MM-DD HH:mm:ss",
          );
        } else {
          (item.last_login_time as any) = "尚未登录过";
        }
        item.password = "";
      }
      return clone;
    }
    return null;
  }
}
