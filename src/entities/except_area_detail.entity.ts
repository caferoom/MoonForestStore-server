import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 这个表好像没用，可以直接删除
@Entity()
export class ExceptAreaDetail {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "int", default: 0 })
  except_area_id: number;

  @Column({ type: "int", default: 0 })
  area: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IExceptAreaDetailCreateMembers = TypeCreateMembers<
  ExceptAreaDetail,
  "except_area_id" | "area" | "is_delete",
  "id"
>;

export type IExceptAreaDetailUpdateMembers = TypeUpdateMembers<ExceptAreaDetail, "id">;
