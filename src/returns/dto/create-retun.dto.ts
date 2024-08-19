// src/return/dto/create-return.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReturnDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
