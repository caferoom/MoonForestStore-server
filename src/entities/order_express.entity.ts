import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["order_id"])
export class OrderExpress {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number; // '主键, 订单物流表id'

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_id: number; // '订单ID, 关联订单表'

  @Column({ type: "varchar", length: 60 })
  shipper_code: string; // '快递单号'

  @Column({ type: "varchar", length: 120 })
  shipper_company: string; // '快递公司名称'

  @Column({ type: "tinyint", unsigned: true, width: 1, default: 0 })
  is_delete: boolean; // '是否删除(1: 使用中、2: 已删除)'
}
