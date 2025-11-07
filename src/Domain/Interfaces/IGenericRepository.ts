import { ObjectLiteral, FindOneOptions } from "typeorm";

export interface IGenericRepository<T extends ObjectLiteral, IdType extends keyof T = "id"> {
    getAll(): Promise<T[]>;
    getById(id: string | number): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(id: string | number, entity: T): Promise<T|null>;
    delete(id: string | number): Promise<boolean>;

    //findOne(options: FindOneOptions<T>): Promise<T | null>;
}