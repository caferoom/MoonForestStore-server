import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 25 })
  username: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255 })
  password_salt: string;

  @Column({ type: "varchar", length: 60 })
  last_login_ip: string;

  @Column({ type: "int", default: 0 })
  last_login_time: number;

  @Column({ type: "tinyint", width: 1, default: 0, nullable: true })
  is_delete: boolean;
}

export type IAdminCreateMembers = TypeCreateMembers<
  Admin,
  "last_login_ip" | "last_login_time" | "is_delete",
  "id"
>;

export type IAdminUpdateMembers = TypeUpdateMembers<Admin, "id">;
