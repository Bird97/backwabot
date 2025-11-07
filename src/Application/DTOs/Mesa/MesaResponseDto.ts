import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class MesaResponseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @AutoMap()
  id_restaurante!: string;

  @ApiProperty()
  @AutoMap()
  created_at!: Date;

  @ApiProperty()
  @AutoMap()
  updated_at!: Date;
}
