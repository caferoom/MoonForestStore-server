import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class DTO_Shipper_UpdateSort {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => Number)
  @IsNumber()
  sort: number;
}

export class DTO_Shipper_EnabledStatus {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Transform(({ value }) => String(value).toLowerCase() === "true")
  @IsBoolean()
  enable: boolean;
}

export class DTO_Shipper_GetDetailInfoById {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class DTO_Shipper_Remove {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class DTO_Shipper_List {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  name: string;
}

export class DTO_Shipper_ChangeAutoStatus {
  @Transform(({ value }) => String(value).toLowerCase() === "true")
  @IsBoolean()
  enable: boolean;
}

export class DTO_Shipper_Save {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sort_order: number;

  @IsString()
  @IsOptional()
  MonthCode: string;

  @IsString()
  @IsOptional()
  CustomerName: string;

  @IsString()
  @IsOptional()
  @Type(() => Boolean)
  enabled: boolean;
}

export class DTO_Shipper_StoreShipperSettings {
  @IsString()
  Name: string;

  @IsString()
  Tel: string;

  @IsString()
  ProvinceName: string;

  @IsString()
  CityName: string;

  @IsString()
  ExpAreaName: string;

  @IsString()
  Address: string;

  @Type(() => Number)
  @IsNumber()
  city_id: number;

  @Type(() => Number)
  @IsNumber()
  province_id: number;

  @Type(() => Number)
  @IsNumber()
  district_id: number;
}
