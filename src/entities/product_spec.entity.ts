import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["product_id"])
export class ProductPesc {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number; // '主键, 唯一标识规格'

  @Column({ type: "bigint", unsigned: true })
  product_id: number; // '商品Id，关联商品表'

  @Column({ type: "varchar", length: 30 })
  name: string; // '规格名称，如颜色、尺码等'

  @Column({ type: "bigint", unsigned: true })
  created_at: number; // '创建时间'
}
