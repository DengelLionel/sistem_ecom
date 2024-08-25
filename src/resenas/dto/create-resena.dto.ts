import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUUID } from 'class-validator';

export class CreateResenaDto {
  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsUUID() // O el tipo de dato que corresponda, dependiendo de cómo manejes los IDs
  usuarioId: string;

  @IsNotEmpty()
  @IsUUID() // O el tipo de dato que corresponda
  productoId: string;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  comentario: string;

  @IsOptional()
  @IsString()
  localizacion?: string;

  @IsOptional()
  @IsString()
  imagenUrl?: string;
}
