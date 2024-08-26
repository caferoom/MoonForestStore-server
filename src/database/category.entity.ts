import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 90 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  keywords: string;

  @Column({ type: "varchar", length: 255 })
  front_desc: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  parent_id: string;

  @Column({ type: "tinyint", unsigned: true, default: 50 })
  sort_order: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  show_index: boolean;

  @Column({ type: "tinyint", unsigned: true, default: 1 })
  is_show: number;

  @Column({ type: "varchar", length: 255, default: null })
  icon_url: string;

  @Column({ type: "varchar", length: 255, default: null })
  img_url: string;

  @Column({ type: "varchar", length: 255, default: null })
  level: string;

  @Column({ type: "varchar", length: 255, default: null })
  front_name: string;

  @Column({ type: "int", default: 0 })
  p_height: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_category: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_channel: boolean;
}

export type ICategoryCreateMembers = TypeCreateMembers<
  Category,
  | "parent_id"
  | "sort_order"
  | "show_index"
  | "is_show"
  | "icon_url"
  | "img_url"
  | "level"
  | "front_name"
  | "p_height"
  | "is_category"
  | "is_channel",
  "id"
>;

export type ICategoryUpdateMembers = TypeUpdateMembers<Category, "id">;
