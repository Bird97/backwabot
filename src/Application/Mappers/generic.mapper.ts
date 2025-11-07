import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';

type ForMemberRule<Entity> = (destination: Entity) => any;

interface EntityMappingOptions<Entity> {
    requestRules?: ForMemberRule<Entity>[];
    updateRules?: ForMemberRule<Entity>[];
}

/**
 * Mapea una entidad a sus diferentes DTOs, permitiendo reglas especiales como `forMember`.
 */
export function createEntityMaps< Entity extends object,
RequestDto extends object,
ResponseDto extends object,
UpdateDto extends object = never>(
    mapper: Mapper,
    EntityClass: new () => Entity,
    RequestDtoClass: new () => RequestDto,
    ResponseDtoClass: new () => ResponseDto,
    UpdateDtoClass?: new () => UpdateDto,
    options?: EntityMappingOptions<Entity>
) {
    // Mapeo Entity -> Response
    createMap(mapper, EntityClass, ResponseDtoClass);

    // Mapeo Request -> Entity
    if (options?.requestRules?.length) {
        createMap(
            mapper,
            RequestDtoClass,
            EntityClass,
            ...options.requestRules.map(rule => forMember(rule, mapFrom(() => "")))
        );
    } else {
        createMap(mapper, RequestDtoClass, EntityClass);
    }

    if (UpdateDtoClass) { 
        if (options?.updateRules?.length) {
            createMap(
                mapper,
                UpdateDtoClass,
                EntityClass,
                ...options.updateRules.map(rule => forMember(rule, mapFrom(() => "")))
            );
        } else {
            createMap(mapper, UpdateDtoClass, EntityClass);
        }
    }
}
