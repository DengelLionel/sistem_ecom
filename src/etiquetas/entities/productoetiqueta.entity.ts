import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Etiqueta } from './etiqueta.entity';

@Entity()
export class ProductoEtiqueta {
  @PrimaryColumn()
  productoId: number;

  @PrimaryColumn()
  etiquetaId: number;

  @ManyToOne(() => Producto, producto => producto.productoEtiquetas, { onDelete: 'CASCADE' })
  producto: Producto;

  @ManyToOne(() => Etiqueta, etiqueta => etiqueta.productoEtiquetas, { onDelete: 'CASCADE' })
  etiqueta: Etiqueta;
}
