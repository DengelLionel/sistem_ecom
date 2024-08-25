import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { ResenaService } from './resena.service';
import { ResenaController } from './resena.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resena])],
  providers: [ResenaService],
  controllers: [ResenaController],
  exports: [ResenaService],
})
export class ResenaModule {}
