import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Resena } from '../resenas/entities/resena.entity';
import { AuthModule } from '../auth/auth.module';  // Importa AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Pedido, Resena]),
    AuthModule,  // Integra AuthModule en los imports
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
