import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';
import { Archivo } from './entities/archivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo])],
  providers: [ArchivosService],
  controllers: [ArchivosController],
  exports: [ArchivosService],
})
export class ArchivosModule {}
