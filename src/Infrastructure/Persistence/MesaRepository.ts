import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { MesaEntity } from "../../Domain/Entities/MesaEntity";
import { IMesaRepository } from "../../Domain/Interfaces/IMesaRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class MesaRepository
  extends GenericRepository<MesaEntity>
  implements IMesaRepository
{
  constructor(dataSource: DataSource) {
    super(MesaEntity, dataSource, "id");
  }
}
