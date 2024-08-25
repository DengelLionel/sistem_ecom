import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtiquetasService } from './etiquetas.service';
import { EtiquetasController } from './etiquetas.controller';
import { Etiqueta } from './entities/etiqueta.entity';
import { ProductoEtiqueta } from './entities/productoetiqueta.entity';
import { PedidoEtiqueta } from './entities/pedidoetiqueta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etiqueta, ProductoEtiqueta, PedidoEtiqueta])],
  providers: [EtiquetasService],
  controllers: [EtiquetasController],
  exports: [EtiquetasService],
})
export class EtiquetasModule {}
