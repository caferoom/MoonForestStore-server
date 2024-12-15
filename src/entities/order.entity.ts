import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum PaymentMethod {
  WeChat = "wechat",
  Alipay = "alipay",
  CreditCard = "credit_card",
  Paypal = "paypal",
  Offline = "offline_support",
}

export enum PayStatus {
  Paid = "paid",
  Refunded = "refunded",
  UnPaid = "unpaid",
}

@Entity()
@Index(["user_id"])
@Unique(["order_sn"])
export class Order {
  // '主键，订单记录'
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  // 订单基础字段
  @Column({ type: "int", unsigned: true })
  user_id: number; // '用户ID，关联用户表'
  @Column({ type: "varchar", length: 255 })
  order_sn: string; // '订单编号，唯一标识订单, 供用户查看'
  @Column({ type: "varchar", length: 20 })
  pay_status: string; // '支付状态: paid、refunded、unpaid'
  @Column({ type: "varchar", length: 20 })
  payment_method: string; // '支付方式: wechat、alipay、credit_card、paypal、offline_support'
  @Column({ type: "varchar", length: 20 })
  order_status: string; // '订单状态: created、paid、preparing、shipped、received、completed、canceled、returning、returned、exchanging、exchanged'
  @Column({ type: "bigint", unsigned: true })
  create_at: number; // 订单创建时间
  @Column({ type: "bigint", unsigned: true })
  update_at: number; // 订单更新时间
  @Column({ type: "bigint", unsigned: true, default: null, nullable: true })
  pay_at: number; // 付款时间
  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  total_amount: number; // 总价（改价/优惠前商品价格）+ 运费
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  shipping_cost: number; // 快递费
  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  pay_amount: number; // 实际支付价格，各种优惠活动|卷使用后价格

  // 收件人信息
  @Column({ type: "varchar", length: 64 })
  recipient_name: string; // 收件人姓名
  @Column({ type: "varchar", length: 32 })
  recipient_mobile: string; // 收件人电话
  @Column({ type: "smallint", unsigned: true })
  province: string; // 收件省份
  @Column({ type: "smallint", unsigned: true })
  city: string; // 收件城市
  @Column({ type: "smallint", unsigned: true})
  district: string; // 收件区域
  @Column({ type: "varchar", length: 255 })
  address: string; // '收件详细地址'
  @Column({ type: "varchar", length: 255, default: "" })
  note: string; // '客户备注'

  @Column({ type: "tinyint", unsigned: true, width: 1, default: 0 })
  is_delete: boolean; // '是否删除(1: 使用中、2: 已删除)'
}
