import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDuenoTiendaDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
