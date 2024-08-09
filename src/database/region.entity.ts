import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["parent_id", "agency_id", "type"])
export class Region {
  @PrimaryGeneratedColumn({ type: "smallint", unsigned: true })
  id: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  parent_id: number;

  @Column({ type: "varchar", length: 120 })
  name: string;

  @Column({ type: "tinyint", default: 2 })
  type: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  agency_id: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  area: number;

  @Column({ type: "varchar", length: 10, default: "0" })
  area_code: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  far_area: number;
}

export type IRegionCreateMembers = TypeCreateMembers<
  Region,
  "parent_id" | "type" | "agency_id" | "area" | "area_code" | "far_area",
  "id"
>;

export type IRegionUpdateMembers = TypeUpdateMembers<Region, "id">;
