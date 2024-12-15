import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// 购物车项表
@Entity()
@Index(["user_id", "sku_id"])
export class CartItem {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number; // 主键, 购物车项表

  @Column({ type: "int", unsigned: true })
  user_id: number; // '用户id, 关联用户表'

  @Column({ type: "bigint", unsigned: true })
  sku_id: number; // 'SKU id, 关联商品SKU表'

  @Column({ type: "smallint", unsigned: true })
  number: number; // '商品数量'

  @Column({ type: "bigint", unsigned: true })
  create_at: number; // '产品添加到购物车时间'

  @Column({ type: "bigint", unsigned: true })
  update_at: number; // '最后更新时间'
}
