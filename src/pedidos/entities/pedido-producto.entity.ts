import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class PedidoProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.productos)
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.pedidos)
  producto: Producto;

  // Añade más columnas si es necesario, como cantidad, precio, etc.
}
