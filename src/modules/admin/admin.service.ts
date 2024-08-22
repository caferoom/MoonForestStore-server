import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Admin, IAdminCreateMembers, IAdminUpdateMembers } from "src/database/admin.entity";
import { Repository } from "typeorm";
import * as crypto from "crypto-js";
import { BaseService } from "src/common/base.service";

@Injectable()
export class AdminService extends BaseService<Admin, IAdminCreateMembers, IAdminUpdateMembers> {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    super(adminRepository);
  }

  async validPassword(username: string, password: string): Promise<Admin | null> {
    const user = await this.adminRepository.findOne({ where: { username } });

    if (user) {
      const md5 = crypto.MD5(password + user.password_salt).toString();
      if (user.password === md5) {
        return user;
      }
    }

    return null;
  }

  async updateLoginTime(id: number): Promise<void> {
    const currentTimestamp = Date.now();
    const user = await this.adminRepository.findOneById(id);
    console.log(currentTimestamp, "updateLoginTime", user);
    if (user) {
      user.last_login_time = currentTimestamp;
      await this.adminRepository.save(user);
    }
  }

  async updateLoginIP(id: number, request: Request): Promise<void> {
    const user = await this.adminRepository.findOneById(id);

    if (user) {
      user.last_login_ip = request.ip;
      await this.adminRepository.save(user);
    }
  }
}
