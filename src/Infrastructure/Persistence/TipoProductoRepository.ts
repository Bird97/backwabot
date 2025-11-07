import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TipoProductoEntity } from "../../Domain/Entities/TipoProductoEntity";
import { ITipoProductoRepository } from "../../Domain/Interfaces/ITipoProductoRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class TipoProductoRepository
  extends GenericRepository<TipoProductoEntity>
  implements ITipoProductoRepository
{
  constructor(dataSource: DataSource) {
    super(TipoProductoEntity, dataSource, "id");
  }

  async find(
    nameProducto: string,
    id_restaurante: string
  ): Promise<TipoProductoEntity | null> {
    const entity = await this.repository.findOne({
      where: {
        name: nameProducto,
        id_restaurante: id_restaurante,
      },
    });
    return entity;
  }
}
