import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DetallesPedidoEntity } from "../../Domain/Entities/DetallePedidoEntity";
import { IDetallePedidoRepository } from "../../Domain/Interfaces/IDetallePedidoRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class DetallePedidoRepository
  extends GenericRepository<DetallesPedidoEntity>
  implements IDetallePedidoRepository
{
  constructor(dataSource: DataSource) {
    super(DetallesPedidoEntity, dataSource, "id");
  }
}
