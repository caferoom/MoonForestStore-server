import { Controller, Get, UseGuards, Request, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminService } from "./admin.service";
import * as dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { Admin } from "src/database/admin.entity";
import * as crypto from "crypto-js";
import { BusinessException } from "src/common/exceptions/business.exception";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";

@Controller("admin")
@UseGuards(AuthGuard("jwt"))
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post("adminAdd")
  async add(@Request() req) {
    const user = req.body.user;
    const { password, username } = user;

    if (`${password}`.replace(/(^\s*)|(\s*$)/g, "") !== password) {
      return null;
    }
    const admin = {
      username: username,
      password_salt: "HIOLABS",
      password: "",
      last_login_ip: req.id,
    };

    admin.password = crypto.MD5(password + "" + admin.password_salt).toString();
    await this.adminService.add(admin);
    return true;
  }

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

  @Post("deleAdmin")
  async delete(@Request() req) {
    const { id } = req.body;

    await this.adminService.remove(id);
    return true;
  }

  @Post("adminDetail")
  async adminDetail(@Request() req) {
    const { id } = req.body;

    const info = await this.adminService.findOneById(id);
    return {
      username: info.username,
      password: info.password,
      id: info.id,
    };
  }

  @Post("adminSave")
  async adminSave(@Request() req) {
    const { user, change } = req.body;

    const obj = Object.assign({}, user);
    const ex = await this.adminService.find({ where: { username: user.username } });
    const filted = ex.filter((e) => e.id !== user.id);
    const self = ex.filter((e) => e.id === user.id)[0];

    // 说明有新密码
    if (change == true) {
      let newPassword = obj.newpassword;
      if (newPassword.replace(/(^\s*)|(\s*$)/g, "").length != 0) {
        newPassword = crypto.MD5(obj.newpassword + self.password_salt).toString();
      }
      obj.password = newPassword;
    }

    if (filted && filted.length) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "用户名称重复",
      });
    }

    return this.adminService.edit(user.id, obj);
  }
}
