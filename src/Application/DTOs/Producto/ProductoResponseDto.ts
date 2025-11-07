import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class ProductoResponseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @AutoMap()
  id_tipo!: string;

  @ApiProperty()
  @AutoMap()
  id_restaurante!: string;
  @ApiProperty()
  @AutoMap()
  precio!: number;

  @ApiProperty({ required: false })
  @AutoMap()
  descripcion?: string;

  @ApiProperty()
  @AutoMap()
  created_at!: Date;

  @ApiProperty()
  @AutoMap()
  updated_at!: Date;
}
