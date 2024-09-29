import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
  id: number;

  // 用户昵称
  @Column({ type: "varchar", length: 1024 })
  nickname: string;

  // 性别 2： 女 1： 男  0：未知
  @Column({ type: "tinyint", unsigned: true, default: 0 })
  gender: number;

  // 生日
  @Column({ type: "int", unsigned: true, default: 0 })
  birthday: number;

  // 注册时间
  @Column({ type: "int", unsigned: true })
  register_time: number;

  // 上次登录时间
  @Column({ type: "int", unsigned: true, })
  last_login_time: number;

  // 上次登录IP
  @Column({ length: 15 })
  last_login_ip: string;

  // 手机号码
  @Column({ length: 20, nullable: true, default: null })
  mobile: string;

  // 注册时候的ip
  @Column({ length: 45 })
  register_ip: string;

  // 用户头像（来自微信）
  @Column({ length: 255 })
  avatar: string;

  // 微信 openId
  @Column({ length: 50 })
  weixin_openid: string;

  // 微信 unionId
  @Column({ length: 50 })
  weixin_unionId: string;

  // 目前已不能从微信开发api获得
  @Column({ length: 255, nullable: true, default: null })
  country: string | null;

  // 目前已不能从微信开发api获得
  @Column({ length: 100, nullable: true, default: null })
  province: string | null;

  // 目前已不能从微信开发api获得
  @Column({ length: 100, nullable: true, default: null })
  city: string | null;

  // 该用户是否禁用
  @Column({ type: "tinyint", width: 1, default: 0 })
  is_disabled: boolean;
}

/***************************************************************** */
// import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
//   id: number;

//   // 用户昵称
//   @Column({ type: "varchar", length: 1024, default: null })
//   nickname: string;

//   // ?? 这个是不是不应该要？微信登录似乎只有nickname，维护这个name干嘛？？？
//   @Column({ type: "varchar", length: 60 })
//   name: string;

//   // ?? 这个是不是不应该要？微信登录似乎只有nickname，维护这个username干嘛？？？
//   @Column({ type: "varchar", length: 60 })
//   username: string;

//   // ?? 这个是不是不应该要？微信登录不需要密码吧
//   @Column({ type: "varchar", length: 32 })
//   password: string;

//   // 目前已不能从微信开发api获得   性别 2： 女 1： 男  0：未知
//   @Column({ type: "tinyint", unsigned: true, default: 0 })
//   gender: number;

//   // 生日   这个从哪来？？
//   @Column({ type: "int", unsigned: true, default: 0 })
//   birthday: number;

//   // 注册时间
//   @Column({ type: "int", unsigned: true, default: 0 })
//   register_time: number;

//   // 上次登录时间
//   @Column({ type: "int", unsigned: true, default: 0 })
//   last_login_time: number;

//   // 上次登录IP
//   @Column({ length: 15 })
//   last_login_ip: string;

//   // 这个是不是和name_mobile只需要一个？？
//   @Column({ length: 20, default: null })
//   mobile: string;

//   // 注册时候的ip
//   @Column({ length: 45 })
//   register_ip: string;

//   // 用户头像 从微信拿来的
//   @Column({ length: 255 })
//   avatar: string;

//   // 从微信获取，不过是否要也同样获取腾讯的unionId？
//   @Column({ length: 50 })
//   weixin_openid: string;

//   // 记录一个微信 unionid
//   // @Column({ length: 50 })
//   // weixin_unionId: string;

//   // todo 这个是不是和mobile只要一个就行？？？从微信获取的那个手机号？？ // 不要这个
//   @Column({ type: "tinyint", width: 1, default: 0 })
//   name_mobile: number;

//   // 目前已不能从微信开发api获得
//   @Column({ length: 255, nullable: true, default: 0 })
//   country: string | null;

//   // 目前已不能从微信开发api获得
//   @Column({ length: 100, nullable: true, default: 0 })
//   province: string | null;

//   // 目前已不能从微信开发api获得
//   @Column({ length: 100, nullable: true, default: 0 })
//   city: string | null;
// }
