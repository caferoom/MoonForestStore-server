import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_id: number;

  @Column({ type: "varchar", length: 50 })
  goods_specification_ids: string;

  @Column({ type: "varchar", length: 60 })
  goods_sn: string;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  goods_number: string;

  @Column({ type: "decimal", unsigned: true, precision: 10, scale: 2, default: 0.0 })
  retail_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  cost: number;

  @Column({ type: "double", precision: 6, scale: 2, default: 0.0 })
  goods_weight: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  has_change: boolean;

  @Column({ type: "varchar", length: 120, default: null })
  goods_name: boolean;

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
