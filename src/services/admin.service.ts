import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Admin } from "src/entities/admin.entity";
import { Repository } from "typeorm";
import * as crypto from "crypto-js";

@Injectable()
export class AdminService {
  public repository: Repository<Admin>;

  constructor(
    @InjectRepository(Admin)
    private regionRepository: Repository<Admin>,
  ) {
    this.repository = regionRepository;
  }

  async validPassword(username: string, password: string): Promise<Admin | null> {
    const user = await this.repository.findOne({ where: { username } });

    if (user) {
      const md5 = crypto.MD5(password + user.password_salt).toString();
      if (user.password === md5) {
        return user;
      }
    }

    return null;
  }

  async usernameExist(username: string, excludeId?: number) {
    const admin = await this.repository.findOneBy({ username: username });
    if (typeof excludeId === "number" && admin) {
      console.log("123", admin, excludeId);
      return admin && admin.id !== excludeId;
    }
    return !!admin;
  }

  async updateLoginTime(adminId: number): Promise<void> {
    const currentTimestamp = Date.now();
    await this.repository.update(
      {
        id: adminId,
      },
      {
        last_login_time: currentTimestamp,
      },
    );
  }

  async updateLoginIP(adminId: number, request: Request): Promise<void> {
    const user = await this.repository.findOneById(adminId);

    if (user) {
      user.last_login_ip = request.ip;
      await this.repository.save(user);
    }
  }

  async getUserInfo(adminId: number) {
    const admin = await this.repository.findOneBy({ id: adminId });
    return {
      username: admin.username,
      id: admin.id,
    };
  }
}
