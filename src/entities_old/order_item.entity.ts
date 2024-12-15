import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// 一个订单中商品相关数据
@Entity()
@Index(["order_id", "goods_id"])
export class OrderItems {
  // 主键，订单商品记录
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  // 订单ID，关联订单表
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_id: number;

  // 商品ID，关联商品表
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  product_id: number;

  // SKU ID，关联sku表
  @Column({ type: "varchar", length: 120, default: null })
  sku_id: string;

  // 商品数量
  @Column({ type: "smallint", unsigned: true, default: 1 })
  number: number;

  // 商品单价
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  unit_price: number;

  // 创建时间
  @Column({ type: "int", default: 0 })
  created_at: number;

  // 更新时间
  @Column({ type: "int", default: 0 })
  updated_at: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}
