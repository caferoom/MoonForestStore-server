import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["spec_id"])
export class ProductSpecValue {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number; // '主键, 唯一标识规格'

  @Column({ type: "bigint", unsigned: true })
  spec_id: number; // '规格键名Id，关联规格键表'

  @Column({ type: "varchar", length: 100 })
  value: string; // '规格的键值（如红色、蓝色、M、L）'

  @Column({ type: "bigint", unsigned: true })
  created_at: number; // '创建时间'
}
