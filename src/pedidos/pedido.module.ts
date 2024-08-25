// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { OrderService } from './pedido.service';
import { OrderController } from './pedido.controller';
import { UsuarioModule } from '../usuarios/usuario.module';
import { ProductoModule } from '../productos/producto.module';
@Module({
  imports: [TypeOrmModule.forFeature([Pedido]),
  UsuarioModule,
  ProductoModule,
],
  controllers: [OrderController],
  providers: [OrderService],
  
})
export class PedidoModule {}
