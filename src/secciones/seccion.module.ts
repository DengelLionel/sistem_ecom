import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from './entities/seccion.entity';
import { SeccionService } from './seccion.service';
import { SeccionController } from './seccion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seccion])],
  providers: [SeccionService],
  controllers: [SeccionController],
  exports: [SeccionService],
})
export class SeccionModule {}
