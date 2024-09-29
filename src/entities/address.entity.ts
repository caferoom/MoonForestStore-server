import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// 收件人地址表
@Entity()
@Index(["user_id"])
export class Address {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", width: 50 })
  name: string; // 收件人姓名

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  user_id: number; // 关联用户id，关联user列表Id

  @Column({ type: "smallint", default: 0 })
  country_id: number; // 国家代码，感觉暂时可以删除了

  @Column({ type: "smallint", default: 0 })
  province_id: number;

  @Column({ type: "smallint", default: 0 })
  city_id: number;

  @Column({ type: "smallint", default: 0 })
  district_id: number;

  @Column({ type: "varchar", length: 120 })
  address: string; // 收件人详细地址

  @Column({ type: "varchar", length: 60 })
  mobile: string; // 收件人电话

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  is_default: number; // 是否默认收件地址

  @Column({ type: "tinyint", width: 1, default: 0, nullable: true })
  is_delete: boolean;
}

export type IAddressCreateMembers = TypeCreateMembers<
  Address,
  "user_id" | "country_id" | "province_id" | "city_id" | "district_id" | "is_default" | "is_delete",
  "id"
>;

export type IAddressUpdateMembers = TypeUpdateMembers<Address, "id">;
