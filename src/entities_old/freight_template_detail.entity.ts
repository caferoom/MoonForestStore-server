import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FreightTemplateDetail {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 对应的freight_template_group表的id， 这个template_id不应该有默认值吧！
  @Column({ type: "int", default: 0 })
  template_id: number;

  // 对应的freight_template_group表的id
  @Column({ type: "int", default: 0 })
  group_id: number;

  // 对应这个规则给哪个区域用 0 是默认，如果找不到对应区域的规则就用0的
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
