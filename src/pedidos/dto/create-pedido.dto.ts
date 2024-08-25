import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  items: { productId: number; quantity: number }[];

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  paymentMethod: string;

  notes?: string;
}
