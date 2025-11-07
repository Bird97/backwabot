import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { ProductoEntity } from "../../Domain/Entities/ProductoEntity";
import { IProductoRepository } from "../../Domain/Interfaces/IProductoRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class ProductoRepository
  extends GenericRepository<ProductoEntity>
  implements IProductoRepository
{
  constructor(dataSource: DataSource) {
    super(ProductoEntity, dataSource, "id");
  }
}
