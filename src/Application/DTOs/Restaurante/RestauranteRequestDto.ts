import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from "class-validator";

export default class RestauranteRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  metodos_pago!: string;

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
