import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specification {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  // 规格分类名称 例如：包装、重量，todo 这里的分类到底分到什么程度要确认，是直接“重量”。还是需要分类1kg、2kg这样
  @Column({ type: "varchar", length: 60 })
  name: string;

  // 排序id
  @Column({ type: "tinyint", unsigned: true, default: 0 })
  sort_order: number;

  // todo，似乎是配合name用的，比如 1kg（十条）里面的十条
  @Column({ type: "varchar", length: 255, default: 0 })
  memo: string;
}

export type ISpecificationCreateMembers = TypeCreateMembers<
  Specification,
  "sort_order" | "memo",
  "id"
>;

export type ISpecificationUpdateMembers = TypeUpdateMembers<Specification, "id">;
