import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Goods_Categories {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  // 分类名称： 如 居家
  @Column({ type: "varchar", length: 90 })
  name: string;

  // 父分类的id
  @Column({ type: "int", unsigned: true, default: 0 })
  parent_id: number;

  // 层级 1 | 2 | 3
  @Column({ type: "tinyint", width: 1, default: 1 })
  level: number;

  // 排序数
  @Column({ type: "tinyint", unsigned: true, default: 50 })
  sort_order: number;

  // 是否在客户端展示
  @Column({ type: "tinyint", width: 1, unsigned: true, default: 1 })
  is_show: boolean;

  // 该分类的图片
  @Column({ type: "varchar", length: 255, nullable: true })
  img_url: string;
}

// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Category {
//   @PrimaryGeneratedColumn({ type: "int", unsigned: true })
//   id: number;

//   // 分类名称： 如 居家
//   @Column({ type: "varchar", length: 90 })
//   name: string;

//   // 父分类的id
//   @Column({ type: "int", unsigned: true, default: 0 })
//   parent_id: number;

//   // 排序数
//   @Column({ type: "tinyint", unsigned: true, default: 50 })
//   sort_order: number;

//   // todo 不知道这个啥意思，好像也没看到用的地方
//   @Column({ type: "varchar", length: 255 })
//   keywords: string;

//   // todo 好像没有用的地方 可以删除
//   @Column({ type: "varchar", length: 255 })
//   front_desc: string;

//   // todo 这个是干嘛的，好像没地方用
//   @Column({ type: "tinyint", width: 1, default: 0 })
//   show_index: boolean;

//   // 首先显示 todo ？？首页是哪里
//   @Column({ type: "tinyint", width: 1, unsigned: true, default: 1 })
//   is_show: number;

//   // 图标url todo 这个图标放哪的？？
//   @Column({ type: "varchar", length: 255, default: null })
//   icon_url: string;

//   // 该分类的图片
//   @Column({ type: "varchar", length: 255, default: null })
//   img_url: string;

//   // 层级 “L1” | “L2” | "L3"
//   @Column({ type: "varchar", length: 255, default: null })
//   level: string;

//   // 页面描述是简短介绍，todo 这个简短介绍放在哪里的？？？
//   @Column({ type: "varchar", length: 255, default: null })
//   front_name: string;

//   // 分类图的高度 todo 这个干嘛用的？？？
//   // 小程序用到
//   @Column({ type: "int", default: 0 })
//   p_height: number;

//   // 全部产品页面显示（todo ，啥叫全部产品页面显示，到底在哪）
//   @Column({ type: "tinyint", width: 1, default: 0 })
//   is_category: number;

//   // 图标显示 todo 这个图标是哪里的？
//   @Column({ type: "tinyint", width: 1, default: 0 })
//   is_channel: number;
// }
