import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export default class DetallePedidoRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_pedido!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_producto!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  cantidad!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  estado!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  nota!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  subtotal!: number;
}
