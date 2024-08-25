import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVarianteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  productoId: number;
}
