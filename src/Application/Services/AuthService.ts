import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import LoginRequest from "Application/DTOs/User/LoginRequest";
import UserResponseDto from "Application/DTOs/User/UserResponseDto";
import { IHashService } from "Application/Interfaces/IHashService";
import { user_mapper } from "Application/Mappers/user.mapper";
import { HASH_SERVICE, USER_REPOSITORY } from "Application/tokens";
import { User } from "Domain/Entities/User";
import { IUserRepository } from "Domain/Interfaces/IUserRepository";

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly _user_repository: IUserRepository,

    @Inject(HASH_SERVICE) private readonly _hash_service: IHashService,

    private readonly _jwt_service: JwtService
  ) {}

  async Login(login_request: LoginRequest): Promise<{
    isSuccess: boolean;
    user?: UserResponseDto;
    message: string;
    token?: string;
    module?: string;
  }> {
    try {
      const user = await this._user_repository.getByEmail(login_request.email);
      if (!user) {
        return {
          isSuccess: false,
          message: "Usuario no encontrado",
        };
      }

      const passwordIsValid = await this._hash_service.compare(
        login_request.password,
        user.password_hash
      );
      if (passwordIsValid) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          address: user.address,
          phone_number: user.phone_number,
        };
        const token = this._jwt_service.sign(payload);
        const user_respose_dto = user_mapper.map(user, User, UserResponseDto);

        if (!user.is_active) {
          return {
            isSuccess: false,
            message: "Este usuario no se encuentra activo.",
          };
        }

        // await this._auditService.createAudit({
        //   user_id: user.id,
        //   target_user_id: user.id,
        //   action: "Inicio de Sesión",
        //   module: "Auth",
        //   ip: login_request.ip ?? "",
        //   state: "success",
        // });

        return {
          module: "AUTH",
          isSuccess: true,
          message: "Inicio de Sesión exitoso",
          user: user_respose_dto,
          token,
        };
      }

      return {
        module: "AUTH",
        isSuccess: false,
        message: "La contraseña no coincide",
      };
    } catch (err: any) {
      return {
        isSuccess: false,
        message: err.message,
      };
    }
  }

  async VerifyToken(token: string) {
    return this._jwt_service.verify(token);
  }

  // async isPasswordDocumentNumber(email: string): Promise<boolean> {
  //   const user = await this._user_repository.getByEmail(email);
  //   if (!user) return false;
  //   // Compara la contraseña con el número de cédula
  //   return await this._hash_service.compare(
  //     user.national_id,
  //     user.password_hash
  //   );
  // }
}
