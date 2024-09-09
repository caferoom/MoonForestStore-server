import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 1024, default: null })
  nickname: string;

  @Column({ type: "varchar", length: 60 })
  name: string;

  @Column({ type: "varchar", length: 60 })
  username: string;

  @Column({ type: "varchar", length: 32 })
  password: string;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  gender: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  birthday: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  register_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  last_login_time: number;

  @Column({ length: 15 })
  last_login_ip: string;

  @Column({ length: 20, default: null })
  mobile: string;

  @Column({ length: 45 })
  register_ip: string;

  @Column({ length: 255 })
  avatar: string;

  @Column({ length: 50 })
  weixin_openid: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  name_mobile: number;

  @Column({ length: 255, nullable: true, default: 0 })
  country: string | null;

  @Column({ length: 100, nullable: true, default: 0 })
  province: string | null;

  @Column({ length: 100, nullable: true, default: 0 })
  city: string | null;
}

export type IUserCreateMembers = TypeCreateMembers<
  User,
  | "gender"
  | "nickname"
  | "register_time"
  | "birthday"
  | "last_login_time"
  | "mobile"
  | "city"
  | "province"
  | "country"
  | "name_mobile",
  "id"
>;
export type IUserUpdateMembers = TypeUpdateMembers<User, "id">;
