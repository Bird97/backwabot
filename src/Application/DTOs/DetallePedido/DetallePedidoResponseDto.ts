import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class DetallePedidoResponseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  id_pedido!: string;

  @ApiProperty()
  @AutoMap()
  id_producto!: string;

  @ApiProperty()
  @AutoMap()
  cantidad!: string;

  @ApiProperty()
  @AutoMap()
  estado!: string;

  @ApiProperty()
  @AutoMap()
  nota!: string;

  @ApiProperty()
  @AutoMap()
  subtotal!: number;

  @ApiProperty()
  @AutoMap()
  created_at!: Date;

  @ApiProperty()
  @AutoMap()
  updated_at!: Date;
}
