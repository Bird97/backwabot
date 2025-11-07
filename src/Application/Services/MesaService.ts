import { Injectable, Inject } from "@nestjs/common";
import { GenericService } from "./GenericService";
import { MesaEntity } from "../../Domain/Entities/MesaEntity";
import MesaRequestDto from "../DTOs/Mesa/MesaRequestDto";
import MesaUpdateDto from "../DTOs/Mesa/MesaUpdateDto";
import MesaResponseDto from "../DTOs/Mesa/MesaResponseDto";
import { IMesaRepository } from "../../Domain/Interfaces/IMesaRepository";
import { mesa_mapper } from "../Mappers/mesa.mapper";
import { MESA_REPOSITORY } from "../tokens";

@Injectable()
export class MesaService extends GenericService<
  MesaEntity,
  MesaRequestDto,
  MesaUpdateDto,
  MesaResponseDto
> {
  constructor(
    @Inject(MESA_REPOSITORY)
    private readonly mesaRepository: IMesaRepository
  ) {
    super(
      mesaRepository,
      mesa_mapper,
      MesaEntity,
      MesaRequestDto,
      MesaUpdateDto,
      MesaResponseDto
    );
  }
}
