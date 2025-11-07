import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AutoMap } from "@automapper/classes";
import { ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("mesas")
export class MesaEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name!: string;

  @Column()
  @AutoMap()
  id_restaurante!: string;
}
