import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req) {
    const body = req.body;

    // 检索数据库拿到用户信息
    // TODO
    const userInfo = {
      userId: 1,
      username: body.username,
      password: body.password,
    };

    // 更新数据库中登录信息
    // TODO
    // update last login time、last login id

    // 生成jwt
    const jwt = await this.authService.login(userInfo);
    return {
      userInfo,
      token: jwt.access_token,
    };
  }

  @Get("checkLogin")
  async checkLogin() {}
}
