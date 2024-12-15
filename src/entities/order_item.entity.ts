import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["order_id", "product_id", "sku_id"])
export class OrderItem {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number; // 主键，订单商品记录

  // 订单ID，关联订单表
  @Column({ type: "bigint", unsigned: true })
  order_id: number; // '订单ID, 关联订单表'

  // 商品ID，关联商品表
  @Column({ type: "bigint", unsigned: true })
  product_id: number; // '商品ID, 关联商品表'

  // SKU ID，关联sku表
  @Column({ type: "bigint", unsigned: true})
  sku_id: number; // 'SKU ID, 商品数量'

  // 商品数量
  @Column({ type: "smallint", unsigned: true, default: 1 })
  number: number; // 商品数量

  // 商品单价
  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  unit_price: number; // '商品单价'

  // 创建时间
  @Column({ type: "bigint", unsigned: true, default: 0 })
  created_at: number; // '订单创建时间'

  // 更新时间
  @Column({ type: "bigint", unsigned: true, default: 0 })
  updated_at: number; // '订单更新时间'

  @Column({ type: "tinyint", unsigned: true, width: 1, default: 0 })
  is_delete: boolean; // '是否删除(1: 使用中、2: 已删除)'
}
