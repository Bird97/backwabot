import { createMapper, MappingProfile } from "@automapper/core";
import { classes } from "@automapper/classes";
import { createEntityMaps } from "./generic.mapper";
import { ProductoEntity } from "../../Domain/Entities/ProductoEntity";
import ProductoRequestDto from "../DTOs/Producto/ProductoRequestDto";
import ProductoResponseDto from "../DTOs/Producto/ProductoResponseDto";
import ProductoUpdateDto from "../DTOs/Producto/ProductoUpdateDto";

export const productoProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    ProductoEntity,
    ProductoRequestDto,
    ProductoResponseDto,
    ProductoUpdateDto
  );
};

export const producto_mapper = createMapper({
  strategyInitializer: classes(),
});
