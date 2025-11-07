import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class PedidoResponseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  id_restaurante!: string;

  @ApiProperty()
  @AutoMap()
  id_mesa!: string;

  @ApiProperty()
  @AutoMap()
  tipo_pedido!: string;

  @ApiProperty()
  @AutoMap()
  estado!: string;

  @ApiProperty()
  @AutoMap()
  total!: number;

  @ApiProperty()
  @AutoMap()
  numero!: string;

  @ApiProperty()
  @AutoMap()
  created_at!: Date;

  @ApiProperty()
  @AutoMap()
  updated_at!: Date;
}
