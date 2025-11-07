import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class UserUpdateDto {
  @AutoMap()
  @ApiProperty()
  name!: string;

  @AutoMap()
  @ApiProperty()
  email!: string;

  @AutoMap()
  @ApiProperty()
  is_active?: boolean;

  @AutoMap()
  @ApiProperty()
  tipe!: String;

  @AutoMap()
  @ApiProperty()
  user_name!: string;

  @AutoMap()
  @ApiProperty()
  phone_number!: string;

  @AutoMap()
  @ApiProperty()
  last_login?: Date;

  @AutoMap()
  @ApiProperty()
  address!: string;

  @AutoMap()
  @ApiProperty()
  id_restaurante?: string;
}
