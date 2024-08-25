import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Variante } from './variante.entity';

@Entity()
export class OpcionVariante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precio: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Variante, variante => variante.opciones)
  variante: Variante;
}
