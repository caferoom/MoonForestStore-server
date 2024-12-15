import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 偏远地区表，每一条记录代表一种设置（如果有的设置将内蒙古设置为偏远地区，有的没有）
@Entity()
export class ExceptArea {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 255, default: null })
  content: string;

  @Column({ type: "varchar", length: 3000, default: 0 })
  area: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}
