import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Admin } from "src/database/admin.entity";
import { FindManyOptions, Repository } from "typeorm";
import * as crypto from "crypto-js";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async exist(username: string): Promise<boolean> {
    const user = await this.adminRepository.findOne({ where: { username } });
    return !!user;
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

  async findOneById(id: number): Promise<Admin | null> {
    return this.adminRepository.findOneBy({ id });
  }

  async find(options: FindManyOptions<Admin>): Promise<Admin[] | null> {
    return this.adminRepository.find(options);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
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
