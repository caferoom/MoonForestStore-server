import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["user_id"])
export class Address {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", width: 50 })
  name: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  user_id: number;

  @Column({ type: "smallint", default: 0 })
  country_id: number;

  @Column({ type: "smallint", default: 0 })
  province_id: number;

  @Column({ type: "smallint", default: 0 })
  city_id: number;

  @Column({ type: "smallint", default: 0 })
  district_id: number;

  @Column({ type: "varchar", length: 120 })
  address: string;

  @Column({ type: "varchar", length: 60 })
  mobile: string;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_default: number;

  @Column({ type: "tinyint", width: 1, default: 0, nullable: true })
  is_delete: boolean;
}

export type IAddressCreateMembers = TypeCreateMembers<
  Address,
  "user_id" | "country_id" | "province_id" | "city_id" | "district_id" | "is_default" | "is_delete",
  "id"
>;

export type IAddressUpdateMembers = TypeUpdateMembers<Address, "id">;
