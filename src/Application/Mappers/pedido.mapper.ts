import { createMapper, MappingProfile } from "@automapper/core";
import { classes } from "@automapper/classes";
import { createEntityMaps } from "./generic.mapper";
import { PedidoEntity } from "../../Domain/Entities/PedidoEntity";
import PedidoRequestDto from "../DTOs/Pedido/PedidoRequestDto";
import PedidoResponseDto from "../DTOs/Pedido/PedidoResponseDto";
import PedidoUpdateDto from "../DTOs/Pedido/PedidoUpdateDto";

export const pedidoProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    PedidoEntity,
    PedidoRequestDto,
    PedidoResponseDto,
    PedidoUpdateDto
  );
};

export const pedido_mapper = createMapper({
  strategyInitializer: classes(),
});
