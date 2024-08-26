import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, JwtStrategy],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
