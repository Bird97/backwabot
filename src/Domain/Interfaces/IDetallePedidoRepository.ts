import { IRepository } from "../../Application/Services/GenericService";
import { DetallesPedidoEntity } from "../Entities/DetallePedidoEntity";

export interface IDetallePedidoRepository
  extends IRepository<DetallesPedidoEntity> {}
