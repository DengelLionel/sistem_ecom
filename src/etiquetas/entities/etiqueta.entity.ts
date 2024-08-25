import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { ProductoEtiqueta } from './productoetiqueta.entity';
import { PedidoEtiqueta } from './pedidoetiqueta.entity';

@Entity()
export class Etiqueta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToMany(() => Producto, producto => producto.etiquetas)
  productos: Producto[];

  @ManyToMany(() => Pedido, pedido => pedido.etiquetas)
  pedidos: Pedido[];

  @OneToMany(() => ProductoEtiqueta, productoEtiqueta => productoEtiqueta.etiqueta)
  productoEtiquetas: ProductoEtiqueta[];

  @OneToMany(() => PedidoEtiqueta, pedidoEtiqueta => pedidoEtiqueta.etiqueta)
  pedidoEtiquetas: PedidoEtiqueta[];
}
