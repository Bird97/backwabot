import { ApiProperty } from "@nestjs/swagger";
export class UpdatePasswordDto {
  @ApiProperty({ example: "NuevaContraseña123" })
  newPassword!: string;
}
