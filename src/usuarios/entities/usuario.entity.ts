import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Resena } from '../../resenas/entities/resena.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];

  @OneToMany(() => Resena, resena => resena.usuario)
  resenas: Resena[];
}
