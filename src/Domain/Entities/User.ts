import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AutoMap } from "@automapper/classes";
import { ManyToOne, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  @AutoMap()
  name!: string;

  @Column({ unique: true })
  @AutoMap()
  email!: string;

  @Column()
  @AutoMap()
  @Exclude()
  password_hash!: string;

  @Column({ default: true })
  @AutoMap()
  is_active!: boolean;

  @Column({ default: "Empleado" })
  @AutoMap()
  tipe!: String;

  @Column({ nullable: true })
  @AutoMap()
  last_login!: Date;

  @Column()
  @AutoMap()
  user_name!: string;

  @Column()
  @AutoMap()
  phone_number!: string;

  @Column()
  @AutoMap()
  address!: string;

  @Column({ nullable: true })
  @AutoMap()
  id_restaurante?: string;
}
