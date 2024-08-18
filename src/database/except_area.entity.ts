import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExceptArea {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 255, default: null })
  content: string;

  @Column({ type: "varchar", length: 3000, default: 0 })
  area: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_delete: boolean;
}

export type IExceptAreaCreateMembers = TypeCreateMembers<
  ExceptArea,
  "content" | "area" | "is_delete",
  "id"
>;

export type IExceptAreaUpdateMembers = TypeUpdateMembers<ExceptArea, "id">;
