import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class RestauranteResponseDto {
  @ApiProperty()
  @AutoMap()
  id!: string;

  @ApiProperty()
  @AutoMap()
  name!: string;

  @ApiProperty()
  @AutoMap()
  metodos_pago!: string;

  @ApiProperty()
  @AutoMap()
  fecha_inicio_suscripcion!: Date;

  @ApiProperty()
  @AutoMap()
  fecha_fin_suscripcion!: Date;

  @ApiProperty()
  @AutoMap()
  created_at!: Date;

  @ApiProperty()
  @AutoMap()
  updated_at!: Date;
}
