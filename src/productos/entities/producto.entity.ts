import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Variante } from '../../variantes/entities/variante.entity';
import { Etiqueta } from '../../etiquetas/entities/etiqueta.entity';
import { ProductoEtiqueta } from '../../etiquetas/entities/productoetiqueta.entity';
import { Resena } from '../../resenas/entities/resena.entity';  // Importa la entidad Resena
import { PedidoProducto } from '../../pedidos/entities/pedido-producto.entity'; 
import { Archivo } from '../../archivos/entities/archivo.entity';
@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioComparacion: number;

  @ManyToOne(() => Categoria, categoria => categoria.productos)
  categoria: Categoria;

  @Column({ default: 0 })
  stock: number;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  metaTitulo: string;

  @Column('text', { nullable: true })
  metaDescripcion: string;

  @Column({ unique: true, nullable: true })
  sku: string;

  @Column({ unique: true, nullable: true })
  codigoBarra: string;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Proveedor, proveedor => proveedor.productos)
  proveedor: Proveedor;

  @OneToMany(() => Variante, variante => variante.producto)
  variantes: Variante[];

  @ManyToMany(() => Etiqueta, etiqueta => etiqueta.productos, { cascade: true })
  @JoinTable({
    name: 'producto_etiqueta',
    joinColumn: { name: 'productoId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'etiquetaId', referencedColumnName: 'id' }
  })
  etiquetas: Etiqueta[];

  @OneToMany(() => ProductoEtiqueta, productoEtiqueta => productoEtiqueta.producto)
  productoEtiquetas: ProductoEtiqueta[];

  // Agregar la relación con Resena
  @OneToMany(() => Resena, resena => resena.producto)
  resenas: Resena[];

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.producto)
  pedidos: PedidoProducto[];
  @OneToMany(() => Archivo, archivo => archivo.producto)
  archivos: Archivo[];
}
