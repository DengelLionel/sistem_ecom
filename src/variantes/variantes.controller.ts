import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantesService } from './variantes.service';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { CreateOpcionVarianteDto } from './dto/create-opcion-variante.dto';
import { UpdateOpcionVarianteDto } from './dto/update-opcion-variante.dto';

@Controller('variantes')
export class VariantesController {
  constructor(private readonly variantesService: VariantesService) {}

  // Endpoints para variantes
  @Post()
  createVariante(@Body() createVarianteDto: CreateVarianteDto) {
    return this.variantesService.createVariante(createVarianteDto);
  }

  @Get()
  findAllVariantes() {
    return this.variantesService.findAllVariantes();
  }

  @Get(':id')
  findOneVariante(@Param('id') id: string) {
    return this.variantesService.findOneVariante(+id);
  }

  @Patch(':id')
  updateVariante(@Param('id') id: string, @Body() updateVarianteDto: UpdateVarianteDto) {
    return this.variantesService.updateVariante(+id, updateVarianteDto);
  }

  @Delete(':id')
  removeVariante(@Param('id') id: string) {
    return this.variantesService.removeVariante(+id);
  }

  // Endpoints para opciones de variante
  @Post('opciones')
  createOpcionVariante(@Body() createOpcionVarianteDto: CreateOpcionVarianteDto) {
    return this.variantesService.createOpcionVariante(createOpcionVarianteDto);
  }

  @Get('opciones')
  findAllOpcionesVariante() {
    return this.variantesService.findAllOpcionesVariante();
  }

  @Get('opciones/:id')
  findOneOpcionVariante(@Param('id') id: string) {
    return this.variantesService.findOneOpcionVariante(+id);
  }

  @Patch('opciones/:id')
  updateOpcionVariante(@Param('id') id: string, @Body() updateOpcionVarianteDto: UpdateOpcionVarianteDto) {
    return this.variantesService.updateOpcionVariante(+id, updateOpcionVarianteDto);
  }

  @Delete('opciones/:id')
  removeOpcionVariante(@Param('id') id: string) {
    return this.variantesService.removeOpcionVariante(+id);
  }
}
