import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estado: string;

  @ManyToOne(() => Usuario, usuario => usuario.resenas)
  usuario: Usuario;

  @ManyToOne(() => Producto, producto => producto.resenas)
  producto: Producto;

  @Column()
  titulo: string;

  @Column('text')
  comentario: string;

  @Column({ nullable: true })
  localizacion: string;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
