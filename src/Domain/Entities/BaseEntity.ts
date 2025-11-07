import { AutoMap } from "@automapper/classes";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @AutoMap()
  @Column({ unique: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @AutoMap()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @AutoMap()
  @Column({ type: "timestamp", nullable: true })
  updated_at!: Date | null;
}
