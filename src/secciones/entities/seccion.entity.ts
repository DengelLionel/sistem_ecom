import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  strapiId: string;  // O cualquier otro campo relevante para la sección
}
