import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FreightTemplateGroup {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "int", default: 0 })
  template_id: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_default: boolean;

  @Column({ type: "varchar", length: 3000, default: 0 })
  area: string;

  @Column({ type: "int", default: 1 })
  start: number;

  @Column("decimal", { precision: 10, scale: 2, unsigned: true, default: 0.0 })
  start_fee: number;

  @Column({ type: "int", default: 1 })
  add: number;

  @Column("decimal", { precision: 10, scale: 2, unsigned: true, default: 0.0 })
  add_fee: number;

  @Column({ type: "tinyint", default: 0 })
  free_by_number: number;

  @Column("decimal", { precision: 10, scale: 2, unsigned: true, default: 0.0 })
  free_by_money: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IFreightTemplateGroupCreateMembers = TypeCreateMembers<
  FreightTemplateGroup,
  | "template_id"
  | "is_default"
  | "area"
  | "start"
  | "start_fee"
  | "add"
  | "add_fee"
  | "free_by_money"
  | "free_by_number"
  | "is_delete",
  "id"
>;

export type IFreightTemplateGroupUpdateMembers = TypeUpdateMembers<FreightTemplateGroup, "id">;
