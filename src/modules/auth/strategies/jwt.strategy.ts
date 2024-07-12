import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any): Promise<any> {
    // 在这里你可以提供一个自定义的验证逻辑
    // 例如从数据库中查找用户并返回用户对象
    // 这里只是返回 payload 作为示例
    console.log("payload", payload);
    return { userId: payload.sub, username: payload.username };
  }
}
