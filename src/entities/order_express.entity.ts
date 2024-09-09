import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["order_id"])
export class OrderExpress {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  order_id: number;

  @Column({ type: "mediumint", unsigned: true, default: 0 })
  shipper_id: number;

  @Column({ type: "varchar", length: 120 })
  shipper_name: string;

  @Column({ type: "varchar", length: 60 })
  shipper_code: string;

  @Column({ type: "varchar", length: 40 })
  logistic_code: string;

  @Column({ type: "varchar", length: 2000 })
  traces: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  is_finish: boolean;

  @Column({ type: "int", nullable: true, default: 0 })
  request_count: number;

  @Column({ type: "int", nullable: true, default: 0 })
  request_time: number;

  @Column({ type: "int", default: 0 })
  add_time: number;

  @Column({ type: "int", default: 0 })
  update_time: number;

  @Column({ type: "tinyint", width: 1, default: 0 })
  express_type: number;

  @Column({ type: "varchar", length: 10, default: 0 })
  region_code: string;
}

export type IOrderExpressCreateMembers = TypeCreateMembers<
  OrderExpress,
  | "order_id"
  | "shipper_id"
  | "is_finish"
  | "request_count"
  | "request_time"
  | "add_time"
  | "update_time"
  | "express_type"
  | "region_code",
  "id"
>;

export type IOrderExpressUpdateMembers = TypeUpdateMembers<OrderExpress, "id">;
