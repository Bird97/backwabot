import { user_mapper, userProfile } from "./user.mapper";
import { restaurante_mapper, restauranteProfile } from "./restaurante.mapper";
import { mesa_mapper, mesaProfile } from "./mesa.mapper";
import { producto_mapper, productoProfile } from "./producto.mapper";
import {
  tipoProducto_mapper,
  tipoProductoProfile,
} from "./tipoProducto.mapper";
import { pedido_mapper, pedidoProfile } from "./pedido.mapper";
import {
  detallePedido_mapper,
  detallePedidoProfile,
} from "./detallePedido.mapper";
import { addProfile } from "@automapper/core";

export function initializeMappers() {
  addProfile(user_mapper, userProfile);
  addProfile(restaurante_mapper, restauranteProfile);
  addProfile(mesa_mapper, mesaProfile);
  addProfile(producto_mapper, productoProfile);
  addProfile(tipoProducto_mapper, tipoProductoProfile);
  addProfile(pedido_mapper, pedidoProfile);
  addProfile(detallePedido_mapper, detallePedidoProfile);
}
