import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Index(["user_id", "order_status", "shipping_status", "pay_status", "pay_id"])
@Unique(["order_sn"])
export class Order {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 20 })
  order_sn: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  user_id: number;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_status: number;

  @Column({ type: "tinyint", unsigned: true, nullable: true, default: 0 })
  offline_pay: number;

  @Column({ type: "tinyint", unsigned: true, nullable: true, default: 0 })
  shipping_status: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  print_status: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  pay_status: number;

  @Column({ type: "varchar", length: 60 })
  consignee: string;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  country: string;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  province: string;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  city: string;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  district: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "varchar", length: 255 })
  print_info: string;

  @Column({ type: "varchar", length: 255 })
  mobile: string;

  @Column({ type: "varchar", length: 255 })
  postscript: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  admin_memo: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  shipping_fee: number;

  @Column({ type: "varchar", length: 120 })
  pay_name: string;

  @Column({ type: "varchar", length: 255, default: 0 })
  pay_id: string;

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  change_price: number;

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  actual_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  order_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  goods_price: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  add_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  pay_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  shipping_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  confirm_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  dealdone_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  freight_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 480.0 })
  express_value: number;

  @Column({ type: "varchar", length: 255, default: "需电联客户请优先派送勿放快递柜" })
  remark: string;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  order_type: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_delete: number;
}

export type IOrderCreateMembers = TypeCreateMembers<
  Order,
  | "user_id"
  | "order_status"
  | "offline_pay"
  | "shipping_status"
  | "print_status"
  | "pay_status"
  | "country"
  | "province"
  | "city"
  | "district"
  | "admin_memo"
  | "shipping_fee"
  | "pay_id"
  | "change_price"
  | "actual_price"
  | "order_price"
  | "goods_price"
  | "add_time"
  | "pay_time"
  | "shipping_time"
  | "confirm_time"
  | "dealdone_time"
  | "freight_price"
  | "express_value"
  | "remark"
  | "order_type"
  | "is_delete",
  "id"
>;

export type IOrderUpdateMembers = TypeUpdateMembers<Order, "id">;
