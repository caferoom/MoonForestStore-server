import { Injectable } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "src/database/admin.entity";
import { Request } from "express";

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Admin> {
    return await this.adminService.validPassword(username, password);
  }

  async login(user: { username: string; password: string }) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  // 更新上次上次登录时间
  async updateLoginTime(id: number) {
    this.adminService.updateLoginTime(id);
  }

  // 更新上次登录IP
  async updateLoginIP(id: number, request: Request) {
    this.adminService.updateLoginIP(id, request);
  }
}
