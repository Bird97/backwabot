# CreditGes

Proyecto basado en Clean Architecture para una Web API.

A continuación se detalla una solución paso a paso creando una estructura inicial de carpetas y archivos basada en Clean Architecture para una Web API.

Pasos para funcionar:

1. npm install  -----   en caso de errores:   npm install --legacy-peer-deps
2. configuar archivo .env con la info de la base de datos.

Organización:
1. En Domain se definen las entidades y las interfaces del dominio.
2. En Application se definen casos de uso y DTOs.
3. En Infrastructure se implementan los repositorios y se configura el servidor de la API.
4. En Presentation se crean los controladores que expondrán los endpoints.

A continuación se agrupan los archivos:

–––––––––––––––––––––––––––––––––––––––––––
