import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateDuenoTiendaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty()
  password: string;
}
