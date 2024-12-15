import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn, Index, OneToMany } from "typeorm";
import { FootPrint } from "./footprint.entity";

@Entity("goods")
@Index(["category_id"])
@Index(["goods_number"])
@Index(["sort_order"])
export class Goods {
  @OneToMany(() => FootPrint, (footprint) => footprint.goods_id)
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  // 对应这个商品是什么品类的
  @Column({ type: "int", unsigned: true, default: 0 })
  category_id: number;

  // 是否售卖中
  @Column({ type: "tinyint", unsigned: true, default: 1 })
  is_on_sale: boolean;

  // 商品名称
  @Column({ type: "varchar", length: 120 })
  name: string;

  // 库存
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_number: number;

  // 销量
  @Column({ type: "int", unsigned: true, default: 0 })
  sell_volume: number;

  @Column({ type: "varchar", length: 255 })
  keywords: string;

  @Column({ type: "varchar", length: 100, default: "0.00" })
  retail_price: string;

  // todo 在admin没使用，在小程序似乎使用了
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, default: 0.0 })
  min_retail_price: number;

  @Column({ type: "varchar", length: 100, default: "0.00" })
  cost_price: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, default: 0.0 })
  min_cost_price: number;

  // 商品简介
  @Column({ type: "varchar", length: 255 })
  goods_brief: string;

  @Column({ type: "text", nullable: true, default: null })
  goods_desc: string;

  // 排序号
  @Column({ type: "smallint", unsigned: true, default: 100 })
  sort_order: number;

  // 首页显示 todo 显示在哪？？
  @Column({ type: "tinyint", nullable: true, default: 0 })
  is_index: boolean;

  // 属性：新品
  @Column({ type: "tinyint", nullable: true, default: 0 })
  is_new: number;

  // 商品单位
  @Column({ type: "varchar", length: 45, default: null })
  goods_unit: string;

  @Column({ type: "varchar", length: 255, default: "0" })
  https_pic_url: string;

  // 商品的图片
  @Column({ type: "varchar", length: 255, default: null })
  list_pic_url: string;

  @Column({ type: "int", nullable: true, default: 0 })
  freight_template_id: number;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  freight_type: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_delete: boolean;

  // 好像在哪里都没用到
  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  has_gallery: boolean;

  // 好像在哪里都没用到
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
