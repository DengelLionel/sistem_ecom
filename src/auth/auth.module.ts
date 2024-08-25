import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsuarioService } from '../usuarios/usuario.service';
import { DuenoTiendaService } from '../duenotienda/duenotienda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { DuenoTienda } from '../duenotienda/entities/duenotienda.entity';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, DuenoTienda]), 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsuarioService, DuenoTiendaService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],  // Asegúrate de exportar JwtModule si lo usas en otros módulos
})
export class AuthModule {}
