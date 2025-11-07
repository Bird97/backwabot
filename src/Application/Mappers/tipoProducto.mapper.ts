import { createMapper, MappingProfile } from "@automapper/core";
import { classes } from "@automapper/classes";
import { createEntityMaps } from "./generic.mapper";
import { TipoProductoEntity } from "../../Domain/Entities/TipoProductoEntity";
import TipoProductoRequestDto from "../DTOs/TipoProducto/TipoProductoRequestDto";
import TipoProductoResponseDto from "../DTOs/TipoProducto/TipoProductoResponseDto";
import TipoProductoUpdateDto from "../DTOs/TipoProducto/TipoProductoUpdateDto";

export const tipoProductoProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    TipoProductoEntity,
    TipoProductoRequestDto,
    TipoProductoResponseDto,
    TipoProductoUpdateDto
  );
};

export const tipoProducto_mapper = createMapper({
  strategyInitializer: classes(),
});
