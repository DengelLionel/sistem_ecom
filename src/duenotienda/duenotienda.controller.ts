import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DuenoTiendaService } from './duenotienda.service';
import { CreateDuenoTiendaDto } from './dto/create-duenotienda.dto';
import { UpdateDuenoTiendaDto } from './dto/update-duenotienda.dto';
import { LoginDuenoTiendaDto } from './dto/login-duenotienda.dto';

@Controller('duenotienda')
export class DuenoTiendaController {
  constructor(private readonly duenoTiendaService: DuenoTiendaService) {}

  @Post('register')
  register(@Body() createDuenoTiendaDto: CreateDuenoTiendaDto) {
    return this.duenoTiendaService.create(createDuenoTiendaDto);
  }

  @Post('login')
  login(@Body() loginDuenoTiendaDto: LoginDuenoTiendaDto) {
    return this.duenoTiendaService.login(loginDuenoTiendaDto);
  }

  @Get()
  findAll() {
    return this.duenoTiendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.duenoTiendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDuenoTiendaDto: UpdateDuenoTiendaDto) {
    return this.duenoTiendaService.update(+id, updateDuenoTiendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duenoTiendaService.remove(+id);
  }
}
