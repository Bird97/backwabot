// application/mappers/user.mapper.ts
import {
  addProfile,
  createMapper,
  MappingProfile,
  createMap,
} from "@automapper/core";
import { classes } from "@automapper/classes";

import { createEntityMaps } from "./generic.mapper"; // importa el genérico

import { User } from "Domain/Entities/User";
import UserResponseDto from "Application/DTOs/User/UserResponseDto";
import UserRequestDto from "Application/DTOs/User/UserRequestDto";
import UserUpdateDto from "Application/DTOs/User/UserUpdateDto";
export const userProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    User,
    UserRequestDto,
    UserResponseDto,
    UserUpdateDto,
    {
      requestRules: [(destination) => destination.password_hash],
      updateRules: [(destination) => destination.password_hash],
    }
  );
};

export const user_mapper = createMapper({
  strategyInitializer: classes(),
});
