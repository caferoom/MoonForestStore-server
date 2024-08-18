import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FreightTemplateDetail {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "int", default: 0 })
  template_id: number;

  @Column({ type: "int", default: 0 })
  group_id: number;

  @Column({ type: "int", default: 0 })
  area: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IFreightTemplateDetailCreateMembers = TypeCreateMembers<
  FreightTemplateDetail,
  "template_id" | "group_id" | "area" | "is_delete",
  "id"
>;

export type IFreightTemplateDetailUpdateMembers = TypeUpdateMembers<FreightTemplateDetail, "id">;
