import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class DTO_Admin_Create {
  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class DTO_Admin_Update {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  username: string;
}

export class DTO_Admin_Delete {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
