import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export default class ProductoRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_tipo!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_restaurante!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  precio!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  descripcion?: string;
}
