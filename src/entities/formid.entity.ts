import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// todo 好像没有用到，要确认一下
@Entity()
export class FormId {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", default: null })
  user_id: number;

  @Column({ type: "int", default: null })
  order_id: number;

  @Column({ type: "varchar", length: 255, default: null })
  form_id: string;

  @Column({ type: "int", default: 0 })
  add_time: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  use_times: boolean;
}

export type IFormIdCreateMembers = TypeCreateMembers<
  FormId,
  "user_id" | "order_id" | "form_id" | "add_time" | "use_times",
  "id"
>;

export type IFormIdUpdateMembers = TypeUpdateMembers<FormId, "id">;
