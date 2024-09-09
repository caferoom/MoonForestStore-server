import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FreightTemplate {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 120, default: 0 })
  name: string;

  @Column("decimal", { precision: 5, scale: 2, unsigned: true, default: 0.0 })
  package_price: number;

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
