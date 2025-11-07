import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class UserUpdateStatusDto {
  @AutoMap()
  @ApiProperty()
  is_active!: boolean;
}
