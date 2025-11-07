import { FindOneOptions } from "typeorm";
import Response from "./Response";

// Interfaz genérica para un repositorio
export interface IRepository<Entity> {
  create(entity: Entity): Promise<Entity>;
  getById(id: string): Promise<Entity | null>;
  update(id: string, entity: Entity): Promise<Entity | null>;
  delete(id: string): Promise<any>;
  getAll(): Promise<Entity[]>;
  //findOne(options: Partial<Entity>): Promise<Entity | null>;
}

// Interfaz genérica para un mapper
export interface IMapper {
  map<S, D>(source: S | any, sourceType: any, destinationType: any): D;
}

export abstract class GenericService<
  Entity,
  CreateDto,
  UpdateDto,
  ResponseDto
> {
  protected constructor(
    protected readonly repository: IRepository<Entity>,
    protected readonly mapper: IMapper,
    private readonly EntityClass: new () => Entity,
    private readonly CreateDtoClass: new () => CreateDto,
    private readonly UpdateDtoClass: new () => UpdateDto,
    private readonly ResponseDtoClass: new () => ResponseDto
  ) {}

  async getAll(): Promise<Response<ResponseDto[] | null>> {
    try {
      const entity = await this.repository.getAll();
      if (!entity) {
        return new Response(true, "No se encontró resultado", null);
      }
      const response = entity.map((e) =>
        this.mapper.map<Entity, ResponseDto>(
          e,
          this.EntityClass,
          this.ResponseDtoClass
        )
      );
      return new Response(true, "", response);
    } catch (error: any) {
      return new Response(false, "Error en la busqueda", null, error.message);
    }
  }

  async create(data: CreateDto): Promise<Response<ResponseDto | any>> {
    try {
      let entity = this.mapper.map<CreateDto, Entity>(
        data,
        this.CreateDtoClass,
        this.EntityClass
      );
      entity = await this.repository.create(entity);
      const response = this.mapper.map<Entity, ResponseDto>(
        entity,
        this.EntityClass,
        this.ResponseDtoClass
      );
      return new Response(true, "Creado correctamente", response);
    } catch (error: any) {
      return new Response(false, "Error al crear", null, error.message);
    }
  }

  async getById(id: string): Promise<Response<ResponseDto | null>> {
    try {
      const entity = await this.repository.getById(id);
      if (!entity) {
        return new Response(true, "No se encontró resultado", null);
      }
      const response = this.mapper.map<Entity, ResponseDto>(
        entity,
        this.EntityClass,
        this.ResponseDtoClass
      );
      return new Response(true, "", response);
    } catch (error: any) {
      return new Response(false, "Error en la busqueda", null, error.message);
    }
  }

  async update(
    id: string,
    data: UpdateDto
  ): Promise<Response<ResponseDto | null>> {
    try {
      const entity = this.mapper.map<UpdateDto, Entity>(
        data,
        this.UpdateDtoClass,
        this.EntityClass
      );
      const updated = await this.repository.update(id, entity);
      if (!updated) {
        return new Response(
          true,
          "No se encontró el objeto a actualizar",
          null
        );
      }
      const response = this.mapper.map<Entity, ResponseDto>(
        updated,
        this.EntityClass,
        this.ResponseDtoClass
      );
      return new Response(true, "Actualizado correctamente", response);
    } catch (error: any) {
      return new Response(false, "Error al actualizar", null, error.message);
    }
  }

  async delete(id: string): Promise<Response<any>> {
    try {
      const deleted = await this.repository.delete(id);
      return new Response(true, "Eliminado correctamente", deleted);
    } catch (error: any) {
      return new Response(false, "Error al eliminar", null, error.message);
    }
  }
}
