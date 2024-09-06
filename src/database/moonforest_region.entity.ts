import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["parent_id", "city_id", "level"])
export class MoonForest_Region {
  // 自增Id
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  // 城市id
  @Column({ type: "int", unsigned: true, default: 0 })
  city_id: number;

  // 省市级别: 0(省|直辖市|特别行政区)、1(市)、2(县|区)
  @Column({ type: "tinyint", unsigned: true, default: 0 })
  level: number;

  // 父级城市id
  @Column({ type: "int", unsigned: true, default: 0 })
  parent_id: number;

  // 区号(统计用区划代码)
  @Column({ type: "varchar", length: 30, unsigned: true, default: "" })
  area_code: string;

  // 名称
  @Column({ type: "varchar", length: 100, unsigned: true, default: "" })
  name: string;

  // 合并名称
  @Column({ type: "varchar", length: 255, default: "" })
  merger_name: string;

  // 经度
  @Column({ type: "varchar", length: 50, default: "" })
  lng: string;

  // 纬度
  @Column({ type: "varchar", length: 50, default: "" })
  lat: string;

  // 是否展示: 0(展示) 、1(不展示)
  @Column({ type: "varchar", length: 50, default: 1 })
  is_show: boolean;
}
