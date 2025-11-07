import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PedidoEntity } from "../../Domain/Entities/PedidoEntity";
import { IPedidoRepository } from "../../Domain/Interfaces/IPedidoRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class PedidoRepository
  extends GenericRepository<PedidoEntity>
  implements IPedidoRepository
{
  constructor(dataSource: DataSource) {
    super(PedidoEntity, dataSource, "id");
  }
}
