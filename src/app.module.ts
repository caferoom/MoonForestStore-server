import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { OverviewModule } from "./modules/overview/overview.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./modules/admin/admin.module";
import { StoreModule } from "./modules/store/store.module";
import { ShipperModule } from "./modules/shipper/shipper.module";
import { CommonModule } from "./modules/common/common.module";
import { FreightModule } from "./modules/freight/freight.module";
import { NoticeModule } from "./modules/notice/notice.module";
import { AdModule } from "./modules/ad/ad.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    AdminModule,
    AdModule,
    StoreModule,
    FreightModule,
    CommonModule,
    NoticeModule,
    ShipperModule,
    OverviewModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        connectorPackage: "mysql2",
        charset: "utf8mb4", // 设置字符集
        collation: "utf8mb4_unicode_ci", // 设置排序规则
        ssl: false,
        synchronize: true,
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
