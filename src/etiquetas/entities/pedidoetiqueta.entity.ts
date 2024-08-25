import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Etiqueta } from './etiqueta.entity';

@Entity()
export class PedidoEtiqueta {
  @PrimaryColumn()
  pedidoId: number;

  @PrimaryColumn()
  etiquetaId: number;

  @ManyToOne(() => Pedido, pedido => pedido.pedidoEtiquetas, { onDelete: 'CASCADE' })
  pedido: Pedido;

  @ManyToOne(() => Etiqueta, etiqueta => etiqueta.pedidoEtiquetas, { onDelete: 'CASCADE' })
  etiqueta: Etiqueta;
}
