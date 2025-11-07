import { IRepository } from "../../Application/Services/GenericService";
import { RestauranteEntity } from "../Entities/RestauranteEntity";

export interface IRestauranteRepository
  extends IRepository<RestauranteEntity> {}
