import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// product表个goods表有啥区别？？
@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 映射 goods表的id
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_id: number;

  // 这个goods_specification_ids 是 会存放多个specification_id么？在carts里面好像会用_分割。其他地方好像直接当成只存1个，需要看下id
  @Column({ type: "varchar", length: 50 })
  goods_specification_ids: string;

  // 商品sku todo 这个是干嘛的？？
  @Column({ type: "varchar", length: 60 })
  goods_sn: string;

  // 库存数目
  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_number: string;

  // 零售价（元）
  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  retail_price: number;

  // 成本
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  cost: number;

  // 商品重量（kg）
  @Column({ type: "double", precision: 6, scale: 2, default: 0.0 })
  goods_weight: number;

  // todo 好像没用到？？？
  @Column({ type: "tinyint", width: 1, default: 0 })
  has_change: boolean;

  // 商品名称
  @Column({ type: "varchar", length: 120, default: null })
  goods_name: boolean;

  // 是否售卖中
  @Column({ type: "tinyint", width: 1, default: 1 })
  is_on_sale: boolean;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IProductCreateMembers = TypeCreateMembers<
  Product,
  | "goods_id"
  | "goods_number"
  | "retail_price"
  | "cost"
  | "goods_weight"
  | "has_change"
  | "goods_name"
  | "is_on_sale"
  | "is_delete",
  "id"
>;

export type IProductUpdateMembers = TypeUpdateMembers<Product, "id">;
