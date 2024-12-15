import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// 这freight的三张表我感觉需要调整下，设计得太差了
@Entity()
export class FreightTemplateGroup {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 对应的freight_template表的字段
  @Column({ type: "int", default: 0 })
  template_id: number;

  // 是否是默认的运费规则，是的话area不需要有值，不是area需要有值！
  @Column({ type: "tinyint", width: 1, default: 0 })
  is_default: boolean;

  // 这里的default: 0 我感觉没必要 default应该是"", 当is_default是0即这个是某些地区用的表的时候需要有值
  // 类如"2,3,23,44",这里的2、3、23是region表中的区域，目前只能指定到省
  @Column({ type: "varchar", length: 3000, default: 0 })
  area: string;

  // 起步件数|重量（根据快递计算价格方式代表不同含义）
  @Column({ type: "int", default: 1 })
  start: number;

  // 起步费用
  @Column("decimal", { precision: 10, scale: 2, unsigned: true, default: 0.0 })
  start_fee: number;

  // 续件|续重
  @Column({ type: "int", default: 1 })
  add: number;

  // 每续件|重增加钱
  @Column("decimal", { precision: 10, scale: 2, unsigned: true, default: 0.0 })
  add_fee: number;

  // n件包邮
  @Column({ type: "tinyint", default: 0 })
  free_by_number: number;

  // 满n块钱包邮 TODO 这里不能实现0元包邮，不过可以设置1件包邮，似乎也满足了需求
  @Column("decimal", { precision: 10, scale: 2, unsigned: true, default: 0.0 })
  free_by_money: number;

  // 是否删除
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
