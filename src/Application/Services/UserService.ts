import { Inject, Injectable } from "@nestjs/common";
import { GenericService } from "./GenericService";
import Response from "./Response";
import UserRequestDto from "Application/DTOs/User/UserRequestDto";
import UserResponseDto from "Application/DTOs/User/UserResponseDto";
import UserUpdateDto from "Application/DTOs/User/UserUpdateDto";
import { IUserRepository } from "Domain/Interfaces/IUserRepository";
import { IHashService } from "Application/Interfaces/IHashService";
import { user_mapper } from "Application/Mappers/user.mapper";
import { User } from "Domain/Entities/User";

@Injectable()
export class UserService extends GenericService<
  User,
  UserRequestDto,
  UserUpdateDto,
  UserResponseDto
> {
  constructor(
    @Inject("USER_REPOSITORY")
    private readonly userRepository: IUserRepository,
    @Inject("HASH_SERVICE")
    private readonly hashService: IHashService
  ) {
    super(
      userRepository,
      user_mapper,
      User,
      UserRequestDto,
      UserUpdateDto,
      UserResponseDto
    );
  }

  async create(data: UserRequestDto): Promise<Response<UserResponseDto | any>> {
    try {
      //console.log(entity);
      // 2. Mapear DTO a entidad
      let user = user_mapper.map<UserRequestDto, User>(
        data,
        UserRequestDto,
        User
      );
      // 4. Crear en base de datos
      user.password_hash = await this.hashService.hash(data.password);
      user = await this.userRepository.create(user);

      // 5. Mapear a DTO de respuesta
      const response = user_mapper.map<User, UserResponseDto>(
        user,
        User,
        UserResponseDto
      );

      return new Response(true, "Usuario creado correctamente", response);
    } catch (error: any) {
      return new Response(
        false,
        "Error al crear el usuario",
        null,
        error.message
      );
    }
  }

  async updatePassword(
    id: string,
    newPassword: string
  ): Promise<Response<UserResponseDto | any>> {
    try {
      const user = await this.userRepository.find(id);
      if (!user) {
        return new Response(false, "Usuario no encontrado", null);
      }

      // Validación de contraseña segura
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return new Response(
          false,
          "La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo.",
          null
        );
      }

      // Verifica que la nueva contraseña no sea igual a la actual
      const isSame = await this.hashService.compare(
        newPassword,
        user.password_hash
      );
      if (isSame) {
        return new Response(
          false,
          "La nueva contraseña no puede ser igual a la actual",
          null
        );
      }
      user.password_hash = await this.hashService.hash(newPassword);
      await this.userRepository.update(id, user);
      const response = user_mapper.map<User, UserResponseDto>(
        user,
        User,
        UserResponseDto
      );
      return new Response(
        true,
        "Contraseña actualizada correctamente",
        response
      );
    } catch (error: any) {
      return new Response(
        false,
        "Error al actualizar la contraseña",
        null,
        error.message
      );
    }
  }
  async resetPassword(id: string): Promise<Response<UserResponseDto | any>> {
    try {
      const user = await this.userRepository.find(id);
      if (!user) {
        return new Response(false, "Usuario no encontrado", null);
      }
      user.password_hash = await this.hashService.hash(user.phone_number);
      await this.userRepository.update(id, user);
      const response = user_mapper.map<User, UserResponseDto>(
        user,
        User,
        UserResponseDto
      );
      return new Response(
        true,
        "Contraseña actualizada correctamente",
        response
      );
    } catch (error: any) {
      return new Response(
        false,
        "Error al actualizar la contraseña",
        null,
        error.message
      );
    }
  }
}
