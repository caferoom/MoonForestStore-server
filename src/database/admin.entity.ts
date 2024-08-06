import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  password_salt: string;

  @Column({ length: 60 })
  last_login_ip: string;

  @Column({ type: "bigint" })
  last_login_time: number;

  @Column({ default: false })
  is_delete: boolean;
}
