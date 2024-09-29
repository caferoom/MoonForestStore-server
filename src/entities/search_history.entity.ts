import { TypeCreateMembers, TypeUpdateMembers } from "src/common/helpers/types";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// 目前用来处理小程序端的搜索历史，TODO，等到做小程序端处理
@Entity()
export class SearchHistory {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "char", length: 50, default: null })
  keyword: string;

  @Column({ type: "varchar", length: 45 })
  from: string;

  @Column({ type: "int", default: 0 })
  add_time: number;

  @Column({ type: "varchar", length: 45, default: null, nullable: true })
  user_id: string;
}

export type ISearchHistoryCreateMembers = TypeCreateMembers<
  SearchHistory,
  "keyword" | "add_time" | "user_id",
  "id"
>;

export type ISearchHistoryUpdateMembers = TypeUpdateMembers<SearchHistory, "id">;
