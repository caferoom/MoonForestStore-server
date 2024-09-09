import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settings {
  @PrimaryGeneratedColumn({ type: "mediumint" })
  id: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  autoDelivery: boolean;

  @Column({ type: "varchar", length: 100, default: null })
  Name: string;

  @Column({ type: "varchar", length: 20, default: null })
  Tel: string;

  @Column({ type: "varchar", length: 20, default: null })
  ProvinceName: string;

  @Column({ type: "varchar", length: 20, default: null })
  CityName: string;

  @Column({ type: "varchar", length: 20, default: null })
  ExpAreaName: string;

  @Column({ type: "varchar", length: 20, default: null })
  Address: string;

  @Column({ type: "int", default: 0 })
  discovery_img_height: number;

  @Column({ type: "varchar", length: 255 })
  discovery_img: string;

  @Column({ type: "int", default: 0 })
  goods_id: number;

  @Column({ type: "int", default: 0 })
  city_id: number;

  @Column({ type: "int", default: 0 })
  province_id: number;

  @Column({ type: "int", default: 0 })
  district_id: number;

  @Column({ type: "int", default: 0 })
  countdown: number;

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
