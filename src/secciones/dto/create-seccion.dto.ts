import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSeccionDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  strapiId?: string;  // Opcional, dependiendo de si se proporciona
}
