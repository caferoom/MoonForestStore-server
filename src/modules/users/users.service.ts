import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IUserCreateMembers, IUserUpdateMembers, User } from "src/database/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService extends BaseService<User, IUserCreateMembers, IUserUpdateMembers> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }
}
