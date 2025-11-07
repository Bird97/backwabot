import { Injectable, Inject } from "@nestjs/common";
import { GenericService } from "./GenericService";
import { TipoProductoEntity } from "../../Domain/Entities/TipoProductoEntity";
import TipoProductoRequestDto from "../DTOs/TipoProducto/TipoProductoRequestDto";
import TipoProductoUpdateDto from "../DTOs/TipoProducto/TipoProductoUpdateDto";
import TipoProductoResponseDto from "../DTOs/TipoProducto/TipoProductoResponseDto";
import { ITipoProductoRepository } from "../../Domain/Interfaces/ITipoProductoRepository";
import { tipoProducto_mapper } from "../Mappers/tipoProducto.mapper";
import { TIPO_PRODUCTO_REPOSITORY } from "../tokens";

@Injectable()
export class TipoProductoService extends GenericService<
  TipoProductoEntity,
  TipoProductoRequestDto,
  TipoProductoUpdateDto,
  TipoProductoResponseDto
> {
  constructor(
    @Inject(TIPO_PRODUCTO_REPOSITORY)
    private readonly tipoProductoRepository: ITipoProductoRepository
  ) {
    super(
      tipoProductoRepository,
      tipoProducto_mapper,
      TipoProductoEntity,
      TipoProductoRequestDto,
      TipoProductoUpdateDto,
      TipoProductoResponseDto
    );
  }
}
