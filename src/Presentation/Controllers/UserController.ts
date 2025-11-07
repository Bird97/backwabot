import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  UseGuards,
  Put,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { UserService } from "Application/Services/UserService";
import { Response } from "express";
import UserRequestDto from "Application/DTOs/User/UserRequestDto";
import UserUpdateDto from "Application/DTOs/User/UserUpdateDto";
import { JwtAuthGuard } from "jwt-auth.guard";
import UserUpdateStatusDto from "Application/DTOs/User/UserUpdateStatusDto";
import UserLastLoginDto from "Application/DTOs/User/UserLastLoginDto";
import { AuthService } from "Application/Services/AuthService";
import { EmailDto } from "Application/DTOs/User/EmailDto";
import { UpdatePasswordDto } from "Application/DTOs/User/UpdatePasswordDto";

@Controller("users")
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService
  ) {}
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth("access-token")
  @Post()
  async createUser(
    @Res() res: Response,
    @Body() createUserDTO: UserRequestDto
  ) {
    const response = await this._userService.create(createUserDTO);
    return response.isSuccess
      ? res.status(HttpStatus.CREATED).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del usuario" })
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async getUserById(@Res() res: Response, @Param("id") id: string) {
    const response = await this._userService.getById(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del usuario" })
  @Put(":id")
  @ApiBearerAuth("access-token")
  async updateUser(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateUserDTO: UserUpdateDto
  ) {
    const response = await this._userService.update(id, updateUserDTO);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del usuario" })
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async deleteUser(@Res() res: Response, @Param("id") id: string) {
    const response = await this._userService.delete(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async getAllUsers(@Res() res: Response) {
    const response = await this._userService.getAll();
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }

  @Post("is-password-document")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async isPasswordDocumentNumber(@Res() res: Response, @Body() body: EmailDto) {
    //const result = await this._authService.isPasswordDocumentNumber(body.email);
    return res.status(HttpStatus.OK).json({ isPasswordDocumentNumber: null }); //result });
  }

  @Put("password/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async updatePassword(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() body: UpdatePasswordDto
  ) {
    const response = await this._userService.updatePassword(
      id,
      body.newPassword
    );
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  @ApiParam({ name: "id", type: String, description: "ID del usuario" })
  @Post("resetpassword/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  async resetPassword(@Res() res: Response, @Param("id") id: string) {
    const response = await this._userService.resetPassword(id);
    return response.isSuccess
      ? res.status(HttpStatus.OK).json(response)
      : res.status(HttpStatus.BAD_REQUEST).json(response);
  }
}
