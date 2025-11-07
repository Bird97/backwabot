import { Injectable, Inject } from "@nestjs/common";
import { GenericService } from "./GenericService";
import { PedidoEntity } from "../../Domain/Entities/PedidoEntity";
import PedidoRequestDto from "../DTOs/Pedido/PedidoRequestDto";
import PedidoUpdateDto from "../DTOs/Pedido/PedidoUpdateDto";
import PedidoResponseDto from "../DTOs/Pedido/PedidoResponseDto";
import { IPedidoRepository } from "../../Domain/Interfaces/IPedidoRepository";
import { pedido_mapper } from "../Mappers/pedido.mapper";
import { PEDIDO_REPOSITORY } from "../tokens";

@Injectable()
export class PedidoService extends GenericService<
  PedidoEntity,
  PedidoRequestDto,
  PedidoUpdateDto,
  PedidoResponseDto
> {
  constructor(
    @Inject(PEDIDO_REPOSITORY)
    private readonly pedidoRepository: IPedidoRepository
  ) {
    super(
      pedidoRepository,
      pedido_mapper,
      PedidoEntity,
      PedidoRequestDto,
      PedidoUpdateDto,
      PedidoResponseDto
    );
  }
}
