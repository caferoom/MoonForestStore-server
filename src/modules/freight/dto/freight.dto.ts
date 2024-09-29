import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class DTO_Freight_Remove {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class DTO_Freight_ExceptAreaDelete {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class DTO_Freight_ExceptAreaDetail {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class DTO_Freight_AddExceptArea {
  @Type(() => String)
  @IsString()
  area: string;

  @Type(() => String)
  @IsString()
  content: string;
}

export class DTO_Freight_SaveExceptArea {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => String)
  @IsString()
  area: string;

  @Type(() => String)
  @IsString()
  content: string;
}

class Freight_AddTable_Table {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  area: string;

  @Type(() => Number)
  @IsNumber()
  start: number;

  @Type(() => Number)
  @IsNumber()
  start_fee: number;

  @Type(() => Number)
  @IsNumber()
  add: number;

  @Type(() => Number)
  @IsNumber()
  add_fee: number;

  @Type(() => Number)
  @IsNumber()
  free_by_money: number;

  @Type(() => Number)
  @IsNumber()
  free_by_number: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  template_id: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_default: boolean;
}

class Freight_AddTable_Info {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @Type(() => String)
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  package_price: number;

  @Type(() => Boolean)
  @IsBoolean()
  freight_type: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_delete: boolean;
}

export class DTO_Freight_AddTable {
  @ValidateNested()
  @Type(() => Freight_AddTable_Info)
  info: Freight_AddTable_Info;

  @ValidateNested({ each: true })
  @Type(() => Freight_AddTable_Table)
  table: Freight_AddTable_Table[];

  @ValidateNested({ each: true })
  @Type(() => Freight_AddTable_Table)
  defaultData: Freight_AddTable_Table[];
}
