import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShowSettings {
  @PrimaryGeneratedColumn({ type: "mediumint" })
  id: number;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  banner: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  channel: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  index_banner_img: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  notice: boolean;
}

export type IShowSettingsCreateMembers = TypeCreateMembers<
  ShowSettings,
  "banner" | "channel" | "index_banner_img" | "notice",
  "id"
>;

export type IShowSettingsUpdateMembers = TypeUpdateMembers<ShowSettings, "id">;
