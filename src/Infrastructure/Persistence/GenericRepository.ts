import {
    Repository,
    EntityTarget,
    DataSource,
    FindOptionsWhere,
    ObjectLiteral,
} from "typeorm";
import { IGenericRepository } from "Domain/Interfaces/IGenericRepository";
import { Injectable } from "@nestjs/common";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class GenericRepository<
    T extends ObjectLiteral,
    IdType extends keyof T = "id" extends keyof T ? "id" : never
> implements IGenericRepository<T, IdType> {
    protected repository: Repository<T>;

    // Constructor que inicializa el repositorio de TypeORM para la entidad T
    constructor(
        private entity: EntityTarget<T>,
        private dataSource: DataSource,
        private idKey: IdType = "id" as IdType
    ) {
        // Inicializa el repositorio a partir de la fuente de datos
        this.repository = this.dataSource.getRepository(this.entity);
    }

    async getAll(): Promise<T[]> {
        // Retorna todas las entidades de la base de datos
        return await this.repository.find();
    }
    async getById(id: T[IdType]): Promise<T | null> {
        const whereClause: FindOptionsWhere<T> = {
            [this.idKey]: id,
        } as FindOptionsWhere<T>;
        // Busca y retorna la entidad o null si no existe
        return await this.repository.findOne({ where: whereClause }) ?? null;
    }
    async create(entity: T): Promise<T> {
        // Guarda y retorna la nueva entidad creada
        return await this.repository.save(entity);
    }
    async update(id: T[IdType], entity: Partial<T>): Promise<T | null> {
        // Construye la cláusula where para identificar la entidad a actualizar
        const whereClause: FindOptionsWhere<T> = {
            [this.idKey]: id,
        } as FindOptionsWhere<T>;

        // Verifica si la entidad existe
        const existing = await this.repository.findOne({ where: whereClause });
        if (!existing) return null;

        // Actualiza la entidad con los nuevos valores
        await this.repository.update(whereClause, entity);
        // Retorna la entidad actualizada
        return await this.repository.findOne({ where: whereClause });
    }
    async delete(id: T[IdType]): Promise<boolean> {
        const whereClause: FindOptionsWhere<T> = {
            [this.idKey]: id,
        } as FindOptionsWhere<T>;

        // Actualiza el campo deleted_at con la fecha actual
        const result = await this.repository.update(whereClause, {
            deleted_at: new Date(),
        } as unknown as QueryDeepPartialEntity<T>);

        return (result.affected ?? 0) > 0;
    }
}
