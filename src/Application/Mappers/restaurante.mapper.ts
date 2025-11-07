import { createMapper, MappingProfile } from "@automapper/core";
import { classes } from "@automapper/classes";
import { createEntityMaps } from "./generic.mapper";
import { RestauranteEntity } from "../../Domain/Entities/RestauranteEntity";
import RestauranteRequestDto from "../DTOs/Restaurante/RestauranteRequestDto";
import RestauranteResponseDto from "../DTOs/Restaurante/RestauranteResponseDto";
import RestauranteUpdateDto from "../DTOs/Restaurante/RestauranteUpdateDto";

export const restauranteProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    RestauranteEntity,
    RestauranteRequestDto,
    RestauranteResponseDto,
    RestauranteUpdateDto
  );
};

export const restaurante_mapper = createMapper({
  strategyInitializer: classes(),
});
