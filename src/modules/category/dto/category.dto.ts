import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";

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
  @IsNumber()
  id: number;

  @IsString()
  status: string;
}
