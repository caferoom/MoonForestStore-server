import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

//快递公司列表
@Entity()
export class Shipper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @Column({ type: "varchar", length: 10 })
  code: string;

  @Column({ type: "int", default: 10 })
  sort_order: number;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  MonthCode: string;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  CustomerName: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  enabled: boolean;
}

export type IShipperCreateMembers = TypeCreateMembers<
  Shipper,
  "enabled" | "sort_order" | "MonthCode" | "CustomerName",
  "id"
>;

export type IShipperUpdateMembers = TypeUpdateMembers<Shipper, "id">;
