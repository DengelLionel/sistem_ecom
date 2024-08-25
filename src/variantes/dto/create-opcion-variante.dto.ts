import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOpcionVarianteDto {
  @IsNotEmpty()
  @IsString()
  valor: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsNotEmpty()
  @IsNumber()
  varianteId: number;
}
