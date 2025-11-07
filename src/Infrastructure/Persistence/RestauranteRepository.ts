import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { RestauranteEntity } from "../../Domain/Entities/RestauranteEntity";
import { IRestauranteRepository } from "../../Domain/Interfaces/IRestauranteRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class RestauranteRepository
  extends GenericRepository<RestauranteEntity>
  implements IRestauranteRepository
{
  constructor(dataSource: DataSource) {
    super(RestauranteEntity, dataSource, "id");
  }
}
