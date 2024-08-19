// src/orders/entities/order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Return } from '../../returns/entities/return.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: 'pending' })
  status: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  // Agrega esta línea para definir la relación con Return
  @OneToMany(() => Return, (ret) => ret.order)
  returns: Return[];
}
