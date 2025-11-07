// infrastructure/database/database.module.ts
import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppDataSource } from "./data-source";

@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return AppDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
