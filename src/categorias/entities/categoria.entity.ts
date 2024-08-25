import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Archivo } from '../../archivos/entities/archivo.entity'; 
@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  metaTitulo: string;

  @Column('text', { nullable: true })
  metaDescripcion: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
  @OneToMany(() => Archivo, archivo => archivo.categoria)
  archivos: Archivo[];
}
