import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AutoMap } from "@automapper/classes";
import { ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("restaurante")
export class RestauranteEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name!: string;

  @Column()
  @AutoMap()
  metodos_pago!: string;

  @AutoMap()
  @Column({ type: "timestamp", nullable: true })
  fecha_inicio_suscripcion!: Date;

  @AutoMap()
  @Column({ type: "timestamp", nullable: true })
  fecha_fin_suscripcion!: Date;
}
