import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 128 })
  username: string;

  @Column({ type: "varchar", length: 512 })
  password: string;

  @Column({ type: "varchar", length: 255 })
  password_salt: string;

  @Column({ type: "varchar", length: 128, nullable: true, default: null })
  last_login_ip: string;

  @Column({ type: "bigint", width: 16, nullable: true, default: null })
  last_login_time: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}
