import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateArchivoDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsNumber()
  productoId?: number;

  @IsOptional()
  @IsNumber()
  categoriaId?: number;
}
