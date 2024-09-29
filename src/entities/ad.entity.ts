import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["enabled"])
export class Ad {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 广告类型 0：商品卡广告（小程序中点击转跳到good_id对应的商品页面） 1：url转跳广告（点击转跳到link对应链接页面，可以跳转普通web网页？？？ todo，不确认）
  @Column({ type: "tinyint", width: 1, default: 0 })
  link_type: boolean;

  // url转跳类型广告的url
  @Column({ type: "varchar", length: 255, nullable: true })
  link: string;

  //goods表id
  @Column({ type: "int", default: 0 })
  goods_id: number;

  // 图片url
  @Column({ type: "text", default: null })
  image_url: string;

  // 结束时间时间戳，是不是也要定一个开始时间
  @Column({ type: "int", default: 0 })
  end_time: number;

  // 是否启用该广告
  @Column({ type: "tinyint", unsigned: true, default: 0 })
  enabled: number;

  // 排序
  @Column({ type: "tinyint", default: 0 })
  sort_order: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IAdCreateMembers = TypeCreateMembers<
  Ad,
  "goods_id" | "enabled" | "sort_order" | "is_delete" | "link_type",
  "id"
>;

export type IAdUpdateMembers = TypeUpdateMembers<Ad, "id">;
