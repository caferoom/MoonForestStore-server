import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 购物车项表
@Entity()
export class CartItem {
  // 主键, 购物车项表
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 用户id, 关联用户表
  @Column({ type: "int", unsigned: true })
  user_id: number;

  // SKU id, 关联商品SKU表
  @Column({ type: "bigint", unsigned: true })
  sku_id: number;

  // 商品数量
  @Column({ type: "smallint", unsigned: true })
  quantity: number;

  // 产品添加到购物车时间
  @Column({ type: "bigint", unsigned: true })
  add_time: number;

  // 最后更新时间
  @Column({ type: "bigint", unsigned: true })
  update_time: number;
}
