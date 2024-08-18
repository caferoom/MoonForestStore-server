import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity("goods")
@Index(["category_id"])
@Index(["goods_number"])
@Index(["sort_order"])
export class Goods {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  category_id: number;

  @Column({ type: "tinyint", unsigned: true, default: 1 })
  is_on_sale: number;

  @Column({ type: "varchar", length: 120 })
  name: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_number: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  sell_volume: number;

  @Column({ type: "varchar", length: 255 })
  keywords: string;

  @Column({ type: "varchar", length: 100, default: "0.00" })
  retail_price: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, default: 0.0 })
  min_retail_price: number;

  @Column({ type: "varchar", length: 100, default: "0.00" })
  cost_price: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, default: 0.0 })
  min_cost_price: number;

  @Column({ type: "varchar", length: 255 })
  goods_brief: string;

  @Column({ type: "text", nullable: true, default: null })
  goods_desc: string;

  @Column({ type: "smallint", unsigned: true, default: 100 })
  sort_order: number;

  @Column({ type: "tinyint", nullable: true, default: 0 })
  is_index: number;

  @Column({ type: "tinyint", nullable: true, default: 0 })
  is_new: number;

  @Column({ type: "varchar", length: 45, default: null })
  goods_unit: string;

  @Column({ type: "varchar", length: 255, default: "0" })
  https_pic_url: string;

  @Column({ type: "varchar", length: 255, default: null })
  list_pic_url: string;

  @Column({ type: "int", nullable: true, default: 0 })
  freight_template_id: number;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  freight_type: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_delete: boolean;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  has_gallery: boolean;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  has_done: boolean;
}

export type IGoodsCreateMembers = TypeCreateMembers<
  Goods,
  | "category_id"
  | "is_on_sale"
  | "goods_number"
  | "sell_volume"
  | "retail_price"
  | "min_retail_price"
  | "cost_price"
  | "min_cost_price"
  | "goods_desc"
  | "sort_order"
  | "is_index"
  | "is_new"
  | "goods_unit"
  | "https_pic_url"
  | "list_pic_url"
  | "freight_template_id"
  | "freight_type"
  | "is_delete"
  | "has_gallery"
  | "has_done",
  "id"
>;

export type IGoodsUpdateMembers = TypeUpdateMembers<Goods, "id">;
