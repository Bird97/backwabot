import { IRepository } from "../../Application/Services/GenericService";
import { ProductoEntity } from "../Entities/ProductoEntity";

export interface IProductoRepository extends IRepository<ProductoEntity> {}
