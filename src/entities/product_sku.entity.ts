import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["product_id"])
export class ProductSku {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number; // '主键, 唯一标识SKU'

  @Column({ type: "bigint", unsigned: true })
  product_id: number; // '商品 ID, 关联商品表'

  @Column({ type: "varchar", length: 255 })
  sku_code: string; // 'SKU 编号(如红色M码)'

  @Column({ type: "int", unsigned: true, default: 0 })
  stock_quantity: number; // "已预留库存（如未支付订单锁定库存）"

  @Column({ type: "int", unsigned: true, default: 0 })
  reserved_quantity: number; // "已预留库存（如未支付订单锁定库存）"

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2 })
  retail_price: number; // '零售价格'

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2 })
  cost_price: number; // '成本价'

  @Column({ type: "varchar", length: 255, default: "{}" })
  spec_values: string; // 'JSON格式。记录具体规格，类似 {"颜色": "红色", "尺码": "M"} '

  @Column({ type: "bigint", unsigned: true })
  update_at: number; // '最后更新时间'

  @Column({ type: "bigint", unsigned: true })
  create_at: number; // '产品添加到购物车时间'
}
