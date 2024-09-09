import { Controller, Get, UseGuards, Request, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminService } from "../../services/admin.service";
import { Admin } from "src/entities/admin.entity";
import * as crypto from "crypto-js";
import { BusinessException } from "src/common/exceptions/business.exception";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { DTO_Admin_Create, DTO_Admin_Delete, DTO_Admin_Update } from "./dto/admin.dto";

@Controller("admin")
@UseGuards(AuthGuard("jwt"))
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post("create")
  async create(@Body() body: DTO_Admin_Create) {
    const { password, username } = body;

    const usernameExist = await this.adminService.usernameExist(username);
    if (usernameExist) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "用户名称重复",
      });
    }

    if (`${password}`.replace(/(^\s*)|(\s*$)/g, "") !== password) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "请删除密码左右空格",
      });
    }

    const admin = new Admin();
    admin.username = username;
    admin.password_salt = "HIOLABS";
    admin.password = crypto.MD5(password + "" + admin.password_salt).toString();
    await this.adminService.repository.save(admin);
  }

  @Post("userInfo")
  async userInfo(@Request() req) {
    return await this.adminService.getUserInfo(req.user.userId);
  }

  @Get("list")
  async index() {
    const data: Admin[] = await this.adminService.repository.find({ where: { is_delete: false } });
    return data.map((d) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, last_login_time, ...others } = d;
      return {
        ...others,
        last_login_time: Number(last_login_time),
      };
    });
  }

  @Post("delete")
  async delete(@Body() body: DTO_Admin_Delete) {
    const { id } = body;
    await this.adminService.repository.delete({
      id: id,
    });
  }

  @Post("update")
  async update(@Body() body: DTO_Admin_Update) {
    const { password, username, id } = body;

    const usernameExist = await this.adminService.usernameExist(username, id);
    if (usernameExist) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "用户名称重复",
      });
    }

    const self = await this.adminService.repository.findOneBy({ id: id });
    if (!self) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "id对应条目不存在",
      });
    }

    const admin = new Admin();
    admin.username = username;

    // 说明有新密码
    if (password) {
      if (password.replace(/(^\s*)|(\s*$)/g, "").length !== 0) {
        admin.password = crypto.MD5(password + self.password_salt).toString();
      } else {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.COMMON,
          message: "请填写密码",
        });
      }
    }

    return this.adminService.repository.update(id, admin);
  }
}
