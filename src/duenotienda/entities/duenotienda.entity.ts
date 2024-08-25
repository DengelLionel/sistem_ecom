import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DuenoTienda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
