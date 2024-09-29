import { Optional } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class DTO_Goods_All {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  size: number;

  @Optional()
  @IsString()
  name: string;
}

export class DTO_Goods_SaleStatus {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Transform(({ value }) => String(value).toLowerCase() === "true")
  @IsBoolean()
  status: boolean;
}
