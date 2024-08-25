import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuenoTiendaService } from './duenotienda.service';
import { DuenoTiendaController } from './duenotienda.controller';
import { DuenoTienda } from './entities/duenotienda.entity';
import { AuthModule } from '../auth/auth.module'; // Importa el AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([DuenoTienda]),
    AuthModule, // Integra el AuthModule en los imports
  ],
  providers: [DuenoTiendaService],
  controllers: [DuenoTiendaController],
  exports: [DuenoTiendaService],
})
export class DuenoTiendaModule {}
