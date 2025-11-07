import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AutoMap } from "@automapper/classes";
import { ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("producto")
export class ProductoEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name!: string;

  @Column()
  @AutoMap()
  id_tipo!: string;

  @Column()
  @AutoMap()
  id_restaurante!: string;

  @Column()
  @AutoMap()
  precio!: number;

  @Column({ type: "text", nullable: true })
  @AutoMap()
  descripcion?: string;
}
