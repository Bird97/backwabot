import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export default class DetallePedidoUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_pedido?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  id_producto?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  cantidad?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  estado?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  nota?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @AutoMap()
  subtotal?: number;
}
