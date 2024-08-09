import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Admin, IAdminCreateMembers, IAdminUpdateMembers } from "src/database/admin.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import * as crypto from "crypto-js";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async edit(id: number, admin: IAdminUpdateMembers) {
    if (typeof id !== "number") {
      throw new InternalServerErrorException("未传递id");
    }
    const one = await this.findOneById(id);
    if (!one) {
      throw new InternalServerErrorException("不存在对应Id的admin");
    }

    // 遍历 admin 的属性并将值赋给 one
    for (const key of Object.keys(admin)) {
      if (admin[key] !== undefined) {
        one[key] = admin[key];
      }
    }

    this.adminRepository.save(one);
  }

  async add(admin: IAdminCreateMembers) {
    this.adminRepository.save(this.adminRepository.create(admin));
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async findOneById(id: number): Promise<Admin | null> {
    return this.adminRepository.findOneBy({ id });
  }

  async find(where: FindOptionsWhere<Admin>[] | FindOptionsWhere<Admin>): Promise<Admin[] | null> {
    return this.adminRepository.find({ where });
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
