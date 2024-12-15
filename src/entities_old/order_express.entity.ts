import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["order_id"])
export class OrderExpress {
  // 主键，订单物流表id
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 订单ID，关联订单表
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_id: number;

  // 快递单号
  @Column({ type: "varchar", length: 60 })
  shipper_code: string;

  // 快递公司名称
  @Column({ type: "varchar", length: 120 })
  shipper_company: string;
}
