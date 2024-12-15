import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["product_id"])
export class ProductImages {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number; // '主键, 唯一标识图片'

  @Column({ type: "bigint", unsigned: true })
  product_id: number; // '商品ID, 关联商品表'

  @Column({ type: "varchar", length: 255 })
  image_url: string; // '图片URL或存储路径'

  @Column({ type: "tinyint", unsigned: true })
  image_type: number; // "图片类型。如主图(0)、细节图(1)"

  @Column({ type: "int", unsigned: true, default: 100 })
  sort_order: number; // "图片排序（如果有多个图片，可以按排序显示）"

  @Column({ type: "bigint", unsigned: true })
  create_at: number; // '创建时间'
}
