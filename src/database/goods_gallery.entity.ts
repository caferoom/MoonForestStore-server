import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["goods_id"])
export class GoodsGallery {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  goods_id: string;

  @Column({ type: "varchar", length: 255 })
  img_url: string;

  @Column({ type: "varchar", length: 255 })
  img_desc: string;

  @Column({ type: "int", unsigned: true, default: 5 })
  sort_order: number;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  is_delete: boolean;
}

export type IGoodsGalleryCreateMembers = TypeCreateMembers<
  GoodsGallery,
  "goods_id" | "sort_order" | "is_delete",
  "id"
>;

export type IGoodsGalleryUpdateMembers = TypeUpdateMembers<GoodsGallery, "id">;
