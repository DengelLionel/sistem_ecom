// src/return/entities/return.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @ManyToOne(() => Order, order => order.returns)
  order: Order;
}
