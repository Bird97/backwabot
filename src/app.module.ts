import { Module } from "@nestjs/common";
import { UserService } from "Application/Services/UserService";
import { AuthModule } from "auth.module";
import { DatabaseModule } from "Infrastructure/Database/database.module";
import { InfrastructureProviders } from "Infrastructure/providers";
import { AuthController } from "Presentation/Controllers/AuthController";
import { UserController } from "Presentation/Controllers/UserController";
import { RestauranteController } from "Presentation/Controllers/RestauranteController";
import { MesaController } from "Presentation/Controllers/MesaController";
import { ProductoController } from "Presentation/Controllers/ProductoController";
import { TipoProductoController } from "Presentation/Controllers/TipoProductoController";
import { PedidoController } from "Presentation/Controllers/PedidoController";
import { DetallePedidoController } from "Presentation/Controllers/DetallePedidoController";
import { ScheduleModule } from "@nestjs/schedule";
import { RestauranteService } from "Application/Services/RestauranteService";
import { MesaService } from "Application/Services/MesaService";
import { ProductoService } from "Application/Services/ProductoService";
import { TipoProductoService } from "Application/Services/TipoProductoService";
import { PedidoService } from "Application/Services/PedidoService";
import { DetallePedidoService } from "Application/Services/DetallePedidoService";

@Module({
  imports: [DatabaseModule, AuthModule, ScheduleModule.forRoot()],
  controllers: [
    UserController,
    AuthController,
    RestauranteController,
    MesaController,
    ProductoController,
    TipoProductoController,
    PedidoController,
    DetallePedidoController,
  ],
  providers: [
    ...InfrastructureProviders,
    UserService,
    RestauranteService,
    MesaService,
    ProductoService,
    TipoProductoService,
    PedidoService,
    DetallePedidoService,
  ],
})
export class AppModule {}
