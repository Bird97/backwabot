import { IRepository } from "../../Application/Services/GenericService";
import { TipoProductoEntity } from "../Entities/TipoProductoEntity";

export interface ITipoProductoRepository
  extends IRepository<TipoProductoEntity> {
  find(
    nameProducto: string,
    id_restaurante: string
  ): Promise<TipoProductoEntity | null>;
}
