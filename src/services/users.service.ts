import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as dayjs from "dayjs";
import { User } from "src/entities/user.entity";
import { IStringOrNullValidator } from "src/modules/users/dto/user.dto";
import { Repository } from "typeorm";
import { isNil } from "lodash";

@Injectable()
export class UserService {
  public repository: Repository<User>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.repository = userRepository;
  }

  // 获取user account 列表
  async getUserList(params: {
    page: number;
    pageSize: number;
    sortField: string;
    sortType: "ASC" | "DESC";
    filters?: {
      nickname?: string;
      lastLoginDateRange?: IStringOrNullValidator[];
      mobile?: string;
      is_disabled?: number;
      weixin_openid?: string;
    };
  }) {
    const { page = 1, pageSize = 10, sortField = "id", sortType = "ASC", filters = {} } = params;
    const {
      nickname = "",
      lastLoginDateRange = [],
      mobile = "",
      is_disabled = "",
      weixin_openid = "",
    } = filters;
    // const buffer = Buffer.from(nickname);
    // const nick = buffer.toString("base64");
    const [data, total] = await this.repository
      .createQueryBuilder()
      .where("nickname LIKE :nickname", { nickname: `%${nickname}%` })
      .andWhere("mobile LIKE :mobile", { mobile: `%${mobile}%` })
      .andWhere("is_disabled LIKE :is_disabled", { is_disabled: `%${is_disabled}%` })
      .andWhere("weixin_openid LIKE :openId", { openId: `%${weixin_openid}%` })
      .andWhere(
        !isNil(lastLoginDateRange[0]) && !isNil(lastLoginDateRange[1])
          ? "last_login_time BETWEEN :start AND :end"
          : !isNil(lastLoginDateRange[0]) && isNil(lastLoginDateRange[1])
            ? "last_login_time > :date"
            : isNil(lastLoginDateRange[0]) && !isNil(lastLoginDateRange[1])
              ? "last_login_time < :date"
              : "1=1", // 不添加任何条件
        !isNil(lastLoginDateRange[0]) && !isNil(lastLoginDateRange[1])
          ? {
              start: dayjs(lastLoginDateRange[0] as unknown as string).valueOf() / 1000,
              end: dayjs(lastLoginDateRange[1] as unknown as string).valueOf() / 1000,
            }
          : !isNil(lastLoginDateRange[0]) && isNil(lastLoginDateRange[1])
            ? { date: dayjs(lastLoginDateRange[0] as unknown as string).valueOf() / 1000 }
            : isNil(lastLoginDateRange[0]) && !isNil(lastLoginDateRange[1])
              ? { date: dayjs(lastLoginDateRange[1] as unknown as string).valueOf() / 1000 }
              : {}, // 不添加任何条件
      )
      .orderBy(sortField, sortType)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      total,
      data,
    };
  }

  // 启用|禁用账户
  async accountEnable(id: number, active: boolean) {
    return await this.repository.update(id, { is_disabled: !active });
  }
}
