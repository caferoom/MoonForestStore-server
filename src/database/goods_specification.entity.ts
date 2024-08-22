import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["goods_id", "specification_id"])
export class GoodsSpecification {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  goods_id: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  specification_id: number;

  @Column({ type: "varchar", length: 50 })
  value: string;

  @Column({ type: "varchar", length: 255 })
  pic_url: string;

  @Column({ type: "tinyint", width: 1, nullable: true, default: 0 })
  is_delete: boolean;
}

export type IGoodsSpecificationCreateMembers = TypeCreateMembers<
  GoodsSpecification,
  "goods_id" | "specification_id" | "is_delete",
  "id"
>;

export type IGoodsSpecificationUpdateMembers = TypeUpdateMembers<GoodsSpecification, "id">;
