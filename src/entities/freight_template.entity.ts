import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FreightTemplate {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 模板名称 模板名称为什么要有default，不起名字怎么能用，并且这个应该要是唯一键
  @Column({ type: "varchar", length: 120, default: 0 })
  name: string;

  // 打包费用 （打包费业界是怎么算的？？？ 按件和计重是不是应该不一样？）
  @Column("decimal", { precision: 5, scale: 2, unsigned: true, default: 0.0 })
  package_price: number;

  // 快递费计算类型 (0: 按件数计算， 1：按重量计算)
  @Column({ type: "tinyint", width: 1, default: 0 })
  freight_type: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IFreightTemplateCreateMembers = TypeCreateMembers<
  FreightTemplate,
  "name" | "package_price" | "freight_type" | "is_delete",
  "id"
>;

export type IFreightTemplateUpdateMembers = TypeUpdateMembers<FreightTemplate, "id">;
