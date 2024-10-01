import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class IStringOrNullValidator {
  @IsString()
  @IsOptional()
  value: string | null;
}

class IUser_list_filters {
  @IsOptional()
  @IsString()
  nickname: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => IStringOrNullValidator)
  lastLoginDateRange: IStringOrNullValidator[];

  @IsOptional()
  @IsString()
  mobile: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  is_disabled: number;

  @IsOptional()
  @IsString()
  weixin_openid: string;
}

export class DTO_User_List {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  size: number;

  @IsOptional()
  @IsString()
  sortField: string;

  @IsOptional()
  @IsString()
  sortType: "ASC" | "DESC";

  @ValidateNested({ each: true })
  @Type(() => IUser_list_filters)
  filters: IUser_list_filters;
}

export class DTO_User_Address_List {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  size: number;
}

export class OUT_User_Address_List {
  @ValidateNested({ each: true })
  @Type(() => IUser_Address_List)
  data: IUser_Address_List[];

  @Type(() => Number)
  @IsNumber()
  total: number;

  @Type(() => Number)
  @IsNumber()
  currentPage: number;
}

export class IUser_Address_List {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => String)
  @IsString()
  name: string; // 收件人姓名

  @Type(() => String)
  @IsString()
  fullAddress: string; // 收件人详细地址

  @Type(() => String)
  @IsString()
  mobile: string; // 收件人电话

  @Type(() => Boolean)
  @IsBoolean()
  is_default: boolean; // 是否默认收件地址
}
