import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GoodsCategory {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string; // 分类名称： 如 居家

  @Column({ type: "int", unsigned: true, default: 0 })
  parent_id: number; // '父分类id'

  @Column({ type: "tinyint", unsigned: true, default: 1 })
  level: number; // 层级 1 | 2 | 3

  @Column({ type: "tinyint", unsigned: true, default: 50 })
  sort_order: number; // '排序权重'

  @Column({ type: "tinyint", width: 1, unsigned: true, default: 1 })
  enabled: boolean; // '是否于前台显示该分类'

  // 该分类的图片
  @Column({ type: "varchar", length: 255, nullable: true })
  img_url: string; // '分类描述图'
}
