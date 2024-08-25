import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './productos/producto.module';
import { CategoriaModule } from './categorias/categoria.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { PedidoModule } from './pedidos/pedido.module';
import { ResenaModule } from './resenas/resena.module';
import { DuenoTiendaModule } from './duenotienda/duenotienda.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo de configuración esté disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecom_den',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Desactiva la sincronización automática
    }),
    ProductoModule,
    CategoriaModule,
    UsuarioModule,
    PedidoModule,
    ResenaModule,
    DuenoTiendaModule,
  ],
})
export class AppModule {}
