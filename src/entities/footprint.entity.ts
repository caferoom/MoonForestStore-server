import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Goods } from "./goods.entity";

@Entity()
export class FootPrint {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", default: 0 })
  user_id: number;

  @ManyToOne(() => Goods, (goods) => goods.id)
  @Column({ type: "int", default: 0 })
  goods_id: number;

  @Column({ type: "int", default: 0 })
  add_time: number;
}

export type IFootPrintCreateMembers = TypeCreateMembers<
  FootPrint,
  "user_id" | "goods_id" | "add_time",
  "id"
>;

export type IFootPrintUpdateMembers = TypeUpdateMembers<FootPrint, "id">;
