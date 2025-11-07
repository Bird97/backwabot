import { createMapper, MappingProfile } from "@automapper/core";
import { classes } from "@automapper/classes";
import { createEntityMaps } from "./generic.mapper";
import { MesaEntity } from "../../Domain/Entities/MesaEntity";
import MesaRequestDto from "../DTOs/Mesa/MesaRequestDto";
import MesaResponseDto from "../DTOs/Mesa/MesaResponseDto";
import MesaUpdateDto from "../DTOs/Mesa/MesaUpdateDto";

export const mesaProfile: MappingProfile = (mapper) => {
  createEntityMaps(
    mapper,
    MesaEntity,
    MesaRequestDto,
    MesaResponseDto,
    MesaUpdateDto
  );
};

export const mesa_mapper = createMapper({
  strategyInitializer: classes(),
});
