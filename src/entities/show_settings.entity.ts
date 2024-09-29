import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// 一些功能配置开关表
@Entity()
export class ShowSettings {
  @PrimaryGeneratedColumn({ type: "mediumint" })
  id: number;

  // 是否显示广告 1 显示 0 不显示
  @Column({ type: "tinyint", unsigned: true, default: 0 })
  banner: number;

  // 广告下的图标 1 显示 0 不显示
  @Column({ type: "tinyint", width: 1, default: 0 })
  channel: boolean;

  // 首页分类图片或文字 1 图片 0 文字
  @Column({ type: "tinyint", width: 1, default: 0 })
  index_banner_img: boolean;

  // 是否启用公告 1 显示 0 不显示
  @Column({ type: "tinyint", width: 1, default: 0 })
  notice: boolean;
}

export type IShowSettingsCreateMembers = TypeCreateMembers<
  ShowSettings,
  "banner" | "channel" | "index_banner_img" | "notice",
  "id"
>;

export type IShowSettingsUpdateMembers = TypeUpdateMembers<ShowSettings, "id">;
