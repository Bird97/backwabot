import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export default class MesaUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_restaurante?: string;
}
