import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export default class PedidoRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_restaurante!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id_mesa!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  tipo_pedido!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  estado!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  total!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  numero!: string;
}
