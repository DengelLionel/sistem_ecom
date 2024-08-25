import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  metaTitulo?: string;

  @IsOptional()
  @IsString()
  metaDescripcion?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
