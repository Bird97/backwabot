import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsDateString } from "class-validator";

export default class RestauranteUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @AutoMap()
  metodos_pago?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  @AutoMap()
  fecha_inicio_suscripcion?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  @AutoMap()
  fecha_fin_suscripcion?: Date;
}
