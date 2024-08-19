// src/orders/dto/create-order.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  items: { productId: number; quantity: number }[];
}

