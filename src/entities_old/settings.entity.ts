import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// 商家发件地址设置表
// 好像现在商家都是拿了这个去打印，这个放后面处理
@Entity()
export class Settings {
  @PrimaryGeneratedColumn({ type: "mediumint" })
  id: number;

  // 打印后自动发货  TODO： 啥意思，打印了标签之后自动把系统中该订单设置为已发货状态的意思么？ 好像没在代码中看到这个逻辑
  // 看上过去这个标签和发货地址放在同一个表也怪怪的
  @Column({ type: "tinyint", width: 1, default: 0 })
  autoDelivery: boolean;

  // 寄件人姓名
  @Column({ type: "varchar", length: 100, default: null })
  Name: string;

  // 寄件人电话
  @Column({ type: "varchar", length: 20, default: null })
  Tel: string;

  // 省区名称
  @Column({ type: "varchar", length: 20, default: null })
  ProvinceName: string;

  // 城市名称
  @Column({ type: "varchar", length: 20, default: null })
  CityName: string;

  // 区县名称
  @Column({ type: "varchar", length: 20, default: null })
  ExpAreaName: string;

  // 详细地址
  @Column({ type: "varchar", length: 20, default: null })
  Address: string;

  // 没看到使用的地方，应该可以删除
  @Column({ type: "int", default: 0 })
  discovery_img_height: number;

  // 没看到使用的地方，应该可以删除
  @Column({ type: "varchar", length: 255 })
  discovery_img: string;

  @Column({ type: "int", default: 0 })
  goods_id: number;

  // 城市id 映射region表的id字段
  @Column({ type: "int", default: 0 })
  city_id: number;

  // 省区id 映射region表的id字段
  @Column({ type: "int", default: 0 })
  province_id: number;

  // 区县区id 映射region表的id字段
  @Column({ type: "int", default: 0 })
  district_id: number;

  // 这个countdown好像是welcome页面，弄了个定时任务用的，应该可以删除
  @Column({ type: "int", default: 0 })
  countdown: number;

  // 这个reset好像是welcome页面，弄了个定时任务用的，应该可以删除
  @Column({ type: "tinyint", width: 1, default: 0 })
  reset: boolean;
}

export type ISettingsCreateMembers = TypeCreateMembers<
  Settings,
  | "autoDelivery"
  | "Name"
  | "Tel"
  | "ProvinceName"
  | "CityName"
  | "ExpAreaName"
  | "Address"
  | "discovery_img_height"
  | "goods_id"
  | "city_id"
  | "province_id"
  | "district_id"
  | "countdown"
  | "reset",
  "id"
>;

export type ISettingsUpdateMembers = TypeUpdateMembers<Settings, "id">;
