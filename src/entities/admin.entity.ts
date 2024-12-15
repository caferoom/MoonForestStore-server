import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 后台服务用户表
@Entity()
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number; // '主键, 购物车项表'

  @Column({ type: "varchar", length: 128 })
  username: string; // '登录用户名'

  @Column({ type: "varchar", length: 512 })
  password: string; // '登录密码（加密后）'

  @Column({ type: "varchar", length: 255 })
  password_salt: string; // '加密用salt'

  @Column({ type: "varchar", length: 128, nullable: true, default: null })
  last_login_ip: string; // '上次登录IP'

  @Column({ type: "bigint", width: 16, nullable: true, default: null })
  last_login_time: number; // '时间戳'

  @Column({ type: "tinyint", unsigned: true, width: 1, default: 0 })
  is_delete: boolean; // '是否删除(1: 使用中、2: 已删除)'
}
