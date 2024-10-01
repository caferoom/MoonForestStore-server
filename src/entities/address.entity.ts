import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

// 收件人地址表
@Entity()
@Index(["user_id"])
export class Address {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", width: 50 })
  name: string; // 收件人姓名

  @Column({ type: "mediumint", unsigned: true })
  user_id: number; // 关联用户id，关联user列表Id

  @Column({ type: "smallint", unsigned: true })
  province_id: number; // 用户省区id，关联 region表的id

  @Column({ type: "smallint", unsigned: true })
  city_id: number; // 用户城市id，关联 region表的id

  @Column({ type: "smallint", unsigned: true })
  district_id: number; // 用户地区id，关联 region表的id

  @Column({ type: "varchar", length: 120, default: "" })
  address: string; // 收件人详细地址

  @Column({ type: "varchar", length: 60, default: "" })
  mobile: string; // 收件人电话

  @Column({ type: "tinyint", width: 1, unsigned: true, default: 0 })
  is_default: boolean; // 是否默认收件地址

  @Column({ type: "tinyint", width: 1, unsigned: true, default: 0 })
  is_delete: boolean;
}
