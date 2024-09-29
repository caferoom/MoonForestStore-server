import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 用户Id todo 这里的id是否是腾讯的微信openId？？
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  user_id: number;

  // 商品Id
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_id: number;

  @Column({ type: "varchar", length: 60 })
  goods_sn: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  product_id: number;

  // 商品名称
  @Column({ type: "varchar", length: 120 })
  goods_name: string;

  @Column({ type: "varchar", length: 120 })
  goods_aka: string;

  @Column({ type: "double", precision: 4, scale: 2, unsigned: true, default: 0.0 })
  goods_weight: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true, default: 0.0 })
  add_price: number;

  // 成交价
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  retail_price: number;

  // 数量
  @Column({ type: "smallint", unsigned: true, default: 0 })
  number: number;

  //型号
  @Column({ type: "text", default: null })
  goods_specifition_name_value: string;

  @Column({ type: "varchar", length: 60 })
  goods_specifition_ids: string;

  @Column({ type: "tinyint", unsigned: true, default: 1 })
  checked: boolean;

  // 商品图片
  @Column({ type: "varchar", length: 255 })
  list_pic_url: string;

  @Column({ type: "mediumint", unsigned: true, default: null })
  freight_template_id: number;

  @Column({ type: "tinyint", width: 1, default: 1 })
  is_on_sale: boolean;

  // 加入购物车时间
  @Column({ type: "int", default: 0 })
  add_time: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_fast: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_delete: number;
}

export type ICartCreateMembers = TypeCreateMembers<
  Cart,
  | "user_id"
  | "goods_id"
  | "product_id"
  | "goods_weight"
  | "add_price"
  | "retail_price"
  | "number"
  | "goods_specifition_name_value"
  | "checked"
  | "freight_template_id"
  | "is_on_sale"
  | "add_time"
  | "is_fast"
  | "is_delete",
  "id"
>;

export type ICartUpdateMembers = TypeUpdateMembers<Cart, "id">;
