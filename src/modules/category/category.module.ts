import { Module } from "@nestjs/common";
import { CategoryService } from "../../services/category.service";
import { CategoryController } from "./category.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, JwtStrategy],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
