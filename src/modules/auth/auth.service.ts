import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.validPassword(username, password);
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: 2 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
