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
import { CartModule } from "./modules/cart/cart.module";
import { GoodsModule } from "./modules/goods/goods.module";
import { CategoryModule } from "./modules/category/category.module";
import { ProductModule } from "./modules/product/product.module";
import { GoodsSpecificationModule } from "./modules/goodsSpecification/goodsSpecification.module";
import { SpecificationModule } from "./modules/specification/specification.module";
import { GoodsGalleryModule } from "./modules/goodsGallery/goodsGallery.module";
import { FreightTemplateModule } from "./modules/freight_template/freight_template.module";
import { UploadModule } from "./modules/upload/upload.module";
import { WapModule } from "./modules/wap/wap.module";
import { OrderModule } from "./modules/order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    AdminModule,
    WapModule,
    UploadModule,
    GoodsModule,
    AdModule,
    CategoryModule,
    ProductModule,
    GoodsSpecificationModule,
    StoreModule,
    OrderModule,
    FreightModule,
    GoodsGalleryModule,
    CartModule,
    CommonModule,
    FreightTemplateModule,
    SpecificationModule,
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
        engine: "InnoDB",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
