import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity()
export class Archivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  tipo: string;

  @ManyToOne(() => Producto, producto => producto.archivos)
  producto: Producto;

  @ManyToOne(() => Categoria, categoria => categoria.archivos)
  categoria: Categoria;
}
