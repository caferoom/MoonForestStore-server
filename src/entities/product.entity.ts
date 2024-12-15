import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["category_id"])
export class Product {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number; // '主键, 商品ID'

  @Column({ type: "bigint", unsigned: true })
  category_id: number; // '分类ID, 关联category表'

  @Column({ type: "tinyint", width: 1, unsigned: true, default: 0 })
  is_on_sale: boolean; // '商品状态, 1 在售 0 下架'

  @Column({ type: "varchar", length: 120 })
  name: string; // '商品名称'

  @Column({ type: "int", unsigned: true, default: 0 })
  sell_volume: number; // '销售量'

  @Column({ type: "int", unsigned: true, default: 100 })
  sort_order: number; // "排序权重"

  @Column({ type: "tinyint", unsigned: true, width: 1, default: 0 })
  is_delete: boolean; // '是否删除(1: 使用中、2: 已删除)'
}
