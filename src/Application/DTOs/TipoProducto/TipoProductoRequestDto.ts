import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class TipoProductoRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_restaurante!: string;
}
