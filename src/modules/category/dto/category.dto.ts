import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class DeleteIconImageDTO {
  @IsNumber()
  id: number;
}

export class CategoryStatusDTO {
  @IsNumber()
  id: number;

  @IsString()
  status: string;
}

export class ChannelStatusDTO {
  @IsNumber()
  id: number;

  @IsString()
  status: string;
}

export class ShowStatusDTO {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Transform(({ value }) => String(value).toLowerCase() === "true")
  @IsBoolean()
  status: boolean;
}
