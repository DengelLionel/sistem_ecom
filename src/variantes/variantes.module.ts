import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantesService } from './variantes.service';
import { VariantesController } from './variantes.controller';
import { Variante } from './entities/variante.entity';
import { OpcionVariante } from './entities/opcion-variante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variante, OpcionVariante])],
  providers: [VariantesService],
  controllers: [VariantesController],
  exports: [VariantesService],
})
export class VariantesModule {}
