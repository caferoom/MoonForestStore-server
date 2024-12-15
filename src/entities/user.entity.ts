import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 1024 })
  nickname: string; // 用户昵称

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  gender: number; // 性别 2： 女 1： 男  0：未知

  @Column({ type: "int", unsigned: true, default: 0 })
  birthday: number; // 生日

  @Column({ type: "int", unsigned: true })
  register_time: number; // 注册时间

  @Column({ type: "int", unsigned: true, })
  last_login_time: number; // 上次登录时间

  @Column({ length: 15 })
  last_login_ip: string; // 上次登录IP

  @Column({ length: 20, nullable: true, default: null })
  mobile: string; // 手机号码

  @Column({ length: 45 })
  register_ip: string; // 注册时候的ip

  @Column({ length: 255 })
  avatar: string; // 用户头像（来自微信）

  @Column({ length: 50 })
  weixin_openid: string; // 微信 openId

  @Column({ length: 50 })
  weixin_unionId: string; // 微信 unionId

  @Column({ length: 255, nullable: true, default: null })
  country: string | null; // 目前已不能从微信开发api获得

  @Column({ length: 100, nullable: true, default: null })
  province: string | null; // 目前已不能从微信开发api获得

  @Column({ length: 100, nullable: true, default: null })
  city: string | null; // 目前已不能从微信开发api获得

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_disabled: boolean; // 该用户是否禁用
}
