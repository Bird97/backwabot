import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AutoMap } from "@automapper/classes";
import { ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("detalle_pedido")
export class DetallesPedidoEntity extends BaseEntity {
  @Column()
  @AutoMap()
  id_pedido!: string;

  @Column()
  @AutoMap()
  id_producto!: string;

  @Column()
  @AutoMap()
  cantidad!: string;

  @Column()
  @AutoMap()
  estado!: string;

  @Column()
  @AutoMap()
  nota!: string;

  @Column()
  @AutoMap()
  subtotal!: number;
}
