import { createMapper, MappingProfile } from "@automapper/core";
import { classes } from "@automapper/classes";
import { createEntityMaps } from "./generic.mapper";
import { DetallesPedidoEntity } from "../../Domain/Entities/DetallePedidoEntity";
import DetallePedidoRequestDto from "../DTOs/DetallePedido/DetallePedidoRequestDto";
import DetallePedidoResponseDto from "../DTOs/DetallePedido/DetallePedidoResponseDto";
import DetallePedidoUpdateDto from "../DTOs/DetallePedido/DetallePedidoUpdateDto";

export const detallePedidoProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    DetallesPedidoEntity,
    DetallePedidoRequestDto,
    DetallePedidoResponseDto,
    DetallePedidoUpdateDto
  );
};

export const detallePedido_mapper = createMapper({
  strategyInitializer: classes(),
});
