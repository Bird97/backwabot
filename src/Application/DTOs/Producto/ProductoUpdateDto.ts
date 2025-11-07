import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export default class ProductoUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_tipo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_restaurante?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @AutoMap()
  precio?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  descripcion?: string;
}
