import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["order_id", "goods_id"])
export class OrderGoods {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_id: number;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_id: number;

  @Column({ type: "varchar", length: 120 })
  goods_name: string;

  @Column({ type: "varchar", length: 120, default: null })
  goods_aka: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  product_id: number;

  @Column({ type: "smallint", unsigned: true, default: 1 })
  number: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  retail_price: number;

  @Column({ type: "text", default: null })
  goods_specifition_name_value: number;

  @Column({ type: "varchar", length: 255 })
  goods_specifition_ids: string;

  @Column({ type: "varchar", length: 255 })
  list_pic_url: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  user_id: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IOrderGoodsCreateMembers = TypeCreateMembers<
  OrderGoods,
  | "order_id"
  | "goods_id"
  | "goods_aka"
  | "product_id"
  | "number"
  | "retail_price"
  | "goods_specifition_name_value"
  | "user_id"
  | "is_delete",
  "id"
>;

export type IOrderGoodsUpdateMembers = TypeUpdateMembers<OrderGoods, "id">;
