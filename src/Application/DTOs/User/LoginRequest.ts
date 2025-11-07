import { ApiProperty } from "@nestjs/swagger";

export default class LoginRequest {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  ip?: string;
}
