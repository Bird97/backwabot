import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AutoMap } from "@automapper/classes";
import { ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("pedido")
export class PedidoEntity extends BaseEntity {
  @Column()
  @AutoMap()
  id_restaurante!: string;

  @Column()
  @AutoMap()
  id_mesa!: string;

  @Column()
  @AutoMap()
  tipo_pedido!: string;

  @Column()
  @AutoMap()
  estado!: string;

  @Column()
  @AutoMap()
  total!: number;

  @Column()
  @AutoMap()
  numero!: string;

  @Column()
  @AutoMap()
  direccion!: string;

  @Column()
  @AutoMap()
  valor_domicilio!: string;
}
