import {
  Controller,
  Post,
  UseGuards,
  Request,
  InternalServerErrorException,
  Get,
} from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req) {
    const body = req.body;

    // 检索数据库拿到用户信息
    const user = await this.authService.validateUser(body.username, body.password);

    if (!user) {
      // 应该在守卫中已验证通过
      throw new InternalServerErrorException();
    }

    // 更新数据库中登录信息
    await this.authService.updateLoginTime(user.id);
    await this.authService.updateLoginIP(user.id, req);

    // 生成jwt
    const jwt = await this.authService.login({
      username: user.username,
      password: user.password,
      id: user.id,
    });

    return {
      userInfo: {
        username: user.username,
        password: user.password,
      },
      token: jwt.access_token,
    };
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("checkLogin")
  async checkLogin() {
    return false;
  }
}
