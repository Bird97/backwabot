import { IRepository } from "../../Application/Services/GenericService";
import { MesaEntity } from "../Entities/MesaEntity";

export interface IMesaRepository extends IRepository<MesaEntity> {}
