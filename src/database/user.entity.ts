import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024 })
  nickname: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60 })
  username: string;

  @Column({ length: 32 })
  password: string;

  @Column({ type: "tinyint", unsigned: true })
  gender: number;

  @Column({ type: "bigint" })
  birthday: number;

  @Column({ type: "bigint" })
  register_time: number;

  @Column({ type: "bigint" })
  last_login_time: number;

  @Column({ length: 15 })
  last_login_ip: string;

  @Column({ length: 20 })
  mobile: string;

  @Column({ length: 45 })
  register_ip: string;

  @Column({ length: 255 })
  avatar: string;

  @Column({ length: 50 })
  weixin_openid: string;

  @Column({ type: "tinyint", width: 1 })
  name_mobile: number;

  @Column({ length: 255, nullable: true })
  country: string | null;

  @Column({ length: 100, nullable: true })
  province: string | null;

  @Column({ length: 100, nullable: true })
  city: string | null;
}
