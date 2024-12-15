import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

//快递公司列表
// 好像现在商家都是拿了这个去打印，这个放后面处理
@Entity()
export class Shipper {
  @PrimaryGeneratedColumn()
  id: number;

  // 快递公司名称 是不是可以长一些 40？
  @Column({ type: "varchar", length: 20 })
  name: string;

  // 看不出来，好像是使用这个作为唯一标识来关联其他表？？？？
  @Column({ type: "varchar", length: 10 })
  code: string;

  // 排序用
  @Column({ type: "int", default: 10 })
  sort_order: number;

  // 快递公司月付编码
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  MonthCode: string;

  // 不知道这个干嘛的，看代码上注释好像是圆通需要|打印电子面单需要？？？可能需要再确认下 todo
  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  CustomerName: string;

  // 是否启用中
  @Column({ type: "tinyint", width: 1, default: 0 })
  enabled: boolean;
}
