# Como hacer endpoints para una tabla nueva:

(Clean Architecture)

Pasos para funcionar:

1. Creas la nueva entidad en src/Domain/Entity guiarse por lo ya creado
2. Crear la interfaz de la entidad creada en src/Domain/Interfaces. Listo(1/4 Domain)
3. Agrega la entidad junto a las demás en Infraestructura/Database/data-source.ts
4. Creas un nuevo archivo con el nombre de la entidad en infraestructure/Persistence.
5. Creas un nuevo provider para la entidad creada en Infraestructure/providers.ts (2/4 Infraestructure)
6. Crear en Application los respectivos DTOs en una carpeta nueva para la entidad.
7. Crear el archivo mapper de la entidad nueva extendiendo del genérico (mira los que ya estan). (user es un caso aparte porque lleva restricciones)
8. Creas el service .
9. agregas el token de la entidad (3/4 Application)
10. Presentation/Controllers agregas el controlador de la nueva entidad (4/4 Aplicación)
11. Agregar controller y provider al app.module

–––––––––––––––––––––––––––––––––––––––––––
