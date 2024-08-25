import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { OpcionVariante } from './opcion-variante.entity';

@Entity()
export class Variante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Producto, producto => producto.variantes)
  producto: Producto;

  @OneToMany(() => OpcionVariante, opcionVariante => opcionVariante.variante)
  opciones: OpcionVariante[];
}
