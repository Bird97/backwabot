import { Injectable, Inject } from "@nestjs/common";
import { GenericService } from "./GenericService";
import { DetallesPedidoEntity } from "../../Domain/Entities/DetallePedidoEntity";
import DetallePedidoRequestDto from "../DTOs/DetallePedido/DetallePedidoRequestDto";
import DetallePedidoUpdateDto from "../DTOs/DetallePedido/DetallePedidoUpdateDto";
import DetallePedidoResponseDto from "../DTOs/DetallePedido/DetallePedidoResponseDto";
import { IDetallePedidoRepository } from "../../Domain/Interfaces/IDetallePedidoRepository";
import { detallePedido_mapper } from "../Mappers/detallePedido.mapper";
import { DETALLE_PEDIDO_REPOSITORY } from "../tokens";

@Injectable()
export class DetallePedidoService extends GenericService<
  DetallesPedidoEntity,
  DetallePedidoRequestDto,
  DetallePedidoUpdateDto,
  DetallePedidoResponseDto
> {
  constructor(
    @Inject(DETALLE_PEDIDO_REPOSITORY)
    private readonly detallePedidoRepository: IDetallePedidoRepository
  ) {
    super(
      detallePedidoRepository,
      detallePedido_mapper,
      DetallesPedidoEntity,
      DetallePedidoRequestDto,
      DetallePedidoUpdateDto,
      DetallePedidoResponseDto
    );
  }
}
