import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

// good 的图片集合 ， 用在哪里的？？todo 商品主图和后面几张？？？
@Entity()
@Index(["goods_id"])
export class GoodsGallery {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  // 对应goods的id，会有多条记录对应同一个good_id
  @Column({ type: "int", unsigned: true, default: 0 })
  goods_id: string;

  // 图片url
  @Column({ type: "varchar", length: 255, default: "" })
  img_url: string;

  // 图片描述信息
  @Column({ type: "varchar", length: 255, default: "" })
  img_desc: string;

  // 排序信息
  @Column({ type: "int", unsigned: true, default: 5 })
  sort_order: number;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  is_delete: boolean;
}

export type IGoodsGalleryCreateMembers = TypeCreateMembers<
  GoodsGallery,
  "goods_id" | "sort_order" | "is_delete" | "img_desc" | "img_url",
  "id"
>;

export type IGoodsGalleryUpdateMembers = TypeUpdateMembers<GoodsGallery, "id">;
