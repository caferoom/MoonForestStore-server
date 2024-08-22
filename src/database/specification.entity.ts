import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specification {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 60 })
  name: string;

  @Column({ type: "tinyint", unsigned: true, default: 0 })
  sort_order: number;

  @Column({ type: "varchar", length: 255, default: 0 })
  memo: string;
}

export type ISpecificationCreateMembers = TypeCreateMembers<
  Specification,
  "sort_order" | "memo",
  "id"
>;

export type ISpecificationUpdateMembers = TypeUpdateMembers<Specification, "id">;
