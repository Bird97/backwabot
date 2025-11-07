import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export default class PedidoUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_restaurante?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_mesa?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  tipo_pedido?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  estado?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @AutoMap()
  total?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  numero?: string;
}
