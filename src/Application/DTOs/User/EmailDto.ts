import { ApiProperty } from "@nestjs/swagger";
export class EmailDto {
  @ApiProperty({ example: "usuario@email.com" })
  email!: string;
}
