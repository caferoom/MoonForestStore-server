import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn({ type: "smallint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 255, default: 0 })
  content: number;

  @Column({ type: "int", default: 0 })
  end_time: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type INoticeCreateMembers = TypeCreateMembers<
  Notice,
  "content" | "end_time" | "is_delete",
  "id"
>;

export type INoticeUpdateMembers = TypeUpdateMembers<Notice, "id">;
