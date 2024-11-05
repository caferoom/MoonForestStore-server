import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Index(["user_id", "order_status", "shipping_status", "pay_status", "pay_id"])
@Unique(["order_sn"])
export class Order {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 20 })
  order_sn: string; // 订单号

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  user_id: number;

  // todo 是不是缺少一个 交易成功（未评价一定时间后自动交易成功）这里可能需要看下是怎么自动变更状态的，每天定时任务么？？
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_status: number; // 101: 待付款; 102: 交易关闭；103：交易关闭（到达时间系统自动取消交易）201：待备货；300：待发货；301：已发货；302：待评价；303：待评价（到达时间系统自动收货）；401：交易成功

  @Column({ type: "tinyint", unsigned: true, nullable: true, default: 0 })
  offline_pay: number;

  @Column({ type: "tinyint", unsigned: true, nullable: true, default: 0 })
  shipping_status: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  print_status: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  pay_status: number;

  @Column({ type: "varchar", length: 60 })
  consignee: string; // 收件人姓名

  @Column({ type: "smallint", unsigned: true, default: 0 })
  country: string; // 收件地址 国家 todo 这个可以删除了

  @Column({ type: "smallint", unsigned: true, default: 0 })
  province: string; // 收件地址，省份

  @Column({ type: "smallint", unsigned: true, default: 0 })
  city: string; // 收件地址，城市

  @Column({ type: "smallint", unsigned: true, default: 0 })
  district: string; // 收件地址，区域

  @Column({ type: "varchar", length: 255 })
  address: string; // 收件地址 详细地址

  @Column({ type: "varchar", length: 255 })
  print_info: string;

  @Column({ type: "varchar", length: 255 })
  mobile: string; // 收件人联系电话

  @Column({ type: "varchar", length: 255 })
  postscript: string; // 买家备注

  @Column({ type: "varchar", length: 255, nullable: true, default: null })
  admin_memo: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  shipping_fee: number;

  @Column({ type: "varchar", length: 120 })
  pay_name: string;

  @Column({ type: "varchar", length: 255, default: 0 })
  pay_id: string;

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  change_price: number; // 改价前价格，原价？？，

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  actual_price: number; // 实际支付价格，改价后价格。todo 这里是不是没有优惠卷逻辑，打折逻辑？？？

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  order_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  goods_price: number;

  @Column({ type: "int", unsigned: true })
  add_time: number; // 下单时间

  @Column({ type: "int", unsigned: true, default: null, nullable: true }) // TODO: 这里是nullable比较好
  pay_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  shipping_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  confirm_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  dealdone_time: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  freight_price: number; // 运费

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
