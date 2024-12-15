import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@Index(["parent_id", "type"])
export class Region {
  @PrimaryGeneratedColumn({ type: "smallint", unsigned: true })
  id: number;

  @Column({ type: "smallint", unsigned: true, nullable: true, default: 0 })
  parent_id: number; // 父级区域id

  @Column({ type: "varchar", length: 120 })
  name: string; // 区域名称

  @Column({ type: "tinyint", default: 2 })
  type: number; // 区域层级： 1（省|直辖市|特别行政区）、2（市）、3（区|县）

  @ManyToOne(() => Region, (region) => region.linked_children, { eager: false, nullable: true })
  @JoinColumn({ name: "parent_id" })
  linked_parent?: Region;

  @OneToMany(() => Region, (region) => region.linked_parent)
  linked_children: Region[];
}
