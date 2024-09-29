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

  //   @ValidateNested({ each: true })
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
