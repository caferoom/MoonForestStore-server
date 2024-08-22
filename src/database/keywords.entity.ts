import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Keywords {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 90 })
  keyword: string;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_hot: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_default: number;

  @Column({ type: "tinyint", unsigned: true, default: 1 })
  is_show: number;

  @Column({ type: "int", unsigned: true, default: 100 })
  sort_order: number;

  @Column({ type: "varchar", length: 255 })
  "scheme _url": string;

  @Column({ type: "int", unsigned: true, default: 0 })
  type: number;
}

export type IKeywordsCreateMembers = TypeCreateMembers<
  Keywords,
  "is_hot" | "is_default" | "is_show" | "sort_order" | "type",
  "id"
>;

export type IKeywordsUpdateMembers = TypeUpdateMembers<Keywords, "id">;
