import { Injectable, Inject } from "@nestjs/common";
import { GenericService } from "./GenericService";
import { RestauranteEntity } from "../../Domain/Entities/RestauranteEntity";
import RestauranteRequestDto from "../DTOs/Restaurante/RestauranteRequestDto";
import RestauranteUpdateDto from "../DTOs/Restaurante/RestauranteUpdateDto";
import RestauranteResponseDto from "../DTOs/Restaurante/RestauranteResponseDto";
import { IRestauranteRepository } from "../../Domain/Interfaces/IRestauranteRepository";
import { restaurante_mapper } from "../Mappers/restaurante.mapper";
import { RESTAURANTE_REPOSITORY } from "../tokens";

@Injectable()
export class RestauranteService extends GenericService<
  RestauranteEntity,
  RestauranteRequestDto,
  RestauranteUpdateDto,
  RestauranteResponseDto
> {
  constructor(
    @Inject(RESTAURANTE_REPOSITORY)
    private readonly restauranteRepository: IRestauranteRepository
  ) {
    super(
      restauranteRepository,
      restaurante_mapper,
      RestauranteEntity,
      RestauranteRequestDto,
      RestauranteUpdateDto,
      RestauranteResponseDto
    );
  }
}
