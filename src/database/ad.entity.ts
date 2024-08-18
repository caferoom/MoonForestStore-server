import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["enabled"])
export class Ad {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  link_type: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  link: string;

  @Column({ type: "int", default: 0 })
  goods_id: number;

  @Column({ type: "text", default: null })
  image_url: string;

  @Column({ type: "int", default: 0 })
  end_time: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  enabled: number;

  @Column({ type: "tinyint", default: 0 })
  sort_order: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IAdCreateMembers = TypeCreateMembers<
  Ad,
  "goods_id" | "enabled" | "sort_order" | "is_delete" | "link_type",
  "id"
>;

export type IAdUpdateMembers = TypeUpdateMembers<Ad, "id">;
