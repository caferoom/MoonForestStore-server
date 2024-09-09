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

  // 父级区域id
  @Column({ type: "smallint", unsigned: true, nullable: true, default: 0 })
  parent_id: number;

  // 区域名称
  @Column({ type: "varchar", length: 120 })
  name: string;

  // 区域层级： 1（省|直辖市|特别行政区）、2（市）、3（区|县）
  @Column({ type: "tinyint", default: 2 })
  type: number;

  // TODO 没有用到，可删除
  @Column({ type: "smallint", unsigned: true, default: 0 })
  agency_id: number;

  // TODO 没有用到，可删除
  @Column({ type: "smallint", unsigned: true, default: 0 })
  area: number;

  // TODO 没有用到，可删除
  @Column({ type: "varchar", length: 10, default: "0" })
  area_code: string;

  // TODO 没有用到，可删除
  @Column({ type: "int", unsigned: true, default: 0 })
  far_area: number;

  @ManyToOne(() => Region, (region) => region.linked_children, { eager: false, nullable: true })
  @JoinColumn({ name: "parent_id" })
  linked_parent?: Region;

  @OneToMany(() => Region, (region) => region.linked_parent)
  linked_children: Region[];
}
