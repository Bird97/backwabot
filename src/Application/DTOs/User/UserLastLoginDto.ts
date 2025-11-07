import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class UserLastLoginDto {

    @AutoMap()
    @ApiProperty()
    last_login!: Date;
    
}