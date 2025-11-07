import { IRepository } from "../../Application/Services/GenericService";
import { PedidoEntity } from "../Entities/PedidoEntity";

export interface IPedidoRepository extends IRepository<PedidoEntity> {}
