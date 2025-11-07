import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class MesaRequestDto {
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
