import {
  USER_REPOSITORY,
  HASH_SERVICE,
  RESTAURANTE_REPOSITORY,
  MESA_REPOSITORY,
  PRODUCTO_REPOSITORY,
  TIPO_PRODUCTO_REPOSITORY,
  PEDIDO_REPOSITORY,
  DETALLE_PEDIDO_REPOSITORY,
} from "Application/tokens";
import { UserRepository } from "./Persistence/UserRepository";
import { HashService } from "Application/Services/HashService";
import { RestauranteRepository } from "./Persistence/RestauranteRepository";
import { MesaRepository } from "./Persistence/MesaRepository";
import { ProductoRepository } from "./Persistence/ProductoRepository";
import { TipoProductoRepository } from "./Persistence/TipoProductoRepository";
import { PedidoRepository } from "./Persistence/PedidoRepository";
import { DetallePedidoRepository } from "./Persistence/DetallePedidoRepository";

export const InfrastructureProviders = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: HASH_SERVICE,
    useClass: HashService,
  },
  {
    provide: RESTAURANTE_REPOSITORY,
    useClass: RestauranteRepository,
  },
  {
    provide: MESA_REPOSITORY,
    useClass: MesaRepository,
  },
  {
    provide: PRODUCTO_REPOSITORY,
    useClass: ProductoRepository,
  },
  {
    provide: TIPO_PRODUCTO_REPOSITORY,
    useClass: TipoProductoRepository,
  },
  {
    provide: PEDIDO_REPOSITORY,
    useClass: PedidoRepository,
  },
  {
    provide: DETALLE_PEDIDO_REPOSITORY,
    useClass: DetallePedidoRepository,
  },
];
