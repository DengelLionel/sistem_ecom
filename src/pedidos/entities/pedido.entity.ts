import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { PedidoProducto } from './pedido-producto.entity';
import { Etiqueta } from '../../etiquetas/entities/etiqueta.entity';
import { PedidoEtiqueta } from '../../etiquetas/entities/pedidoetiqueta.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  usuario: Usuario;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column()
  direccionEnvio: string;

  @Column()
  nombresapellidos: string;

  @Column()
  celular: string;

  @Column({ nullable: true })
  referencia: string;

  @Column()
  provincia: string;

  @Column()
  distrito: string;

  @Column({ nullable: true })
  correoElectronico: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pagado: number;

  @Column()
  metodoPago: string;

  @Column({ nullable: true })
  codigoDescuento: string;

  @Column({ nullable: true })
  nombreDescuento: string;

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.pedido)
  productos: PedidoProducto[];

  @ManyToMany(() => Etiqueta, etiqueta => etiqueta.pedidos)
  @JoinTable({
    name: 'pedido_etiqueta', // Nombre de la tabla intermedia
    joinColumn: { name: 'pedidoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'etiquetaId', referencedColumnName: 'id' }
  })
  etiquetas: Etiqueta[];

  @OneToMany(() => PedidoEtiqueta, pedidoEtiqueta => pedidoEtiqueta.pedido)
  pedidoEtiquetas: PedidoEtiqueta[];
}
