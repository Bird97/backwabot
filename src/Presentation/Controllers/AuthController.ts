import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "Application/Services/AuthService";
import LoginRequest from "Application/DTOs/User/LoginRequest";
import { Response, Request } from "express";
import { LoggingInterceptor } from "logger.interceptor";

@Controller("login")
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly loginService: AuthService) {}

  @Post()
  async login(@Body() login_request: LoginRequest) {
    try {
      const response = await this.loginService.Login(login_request);
      if (response.isSuccess) {
        return {
          message: response.message,
          user: response.user,
          token: response.token,
          module: response.module,
          details: response.user,
        };
      }
      // Para errores, usa HttpException
      throw new HttpException(response.message, HttpStatus.UNAUTHORIZED);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
