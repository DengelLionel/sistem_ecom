// usuario.controller.ts

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UsuarioService } from './usuario.service';
  import { CreateUsuarioDto } from './dto/create-usuario.dto';
  import { UpdateUsuarioDto } from './dto/update-usuario.dto';
  import { Usuario } from './entities/usuario.entity';
  
  @Controller('usuarios')
  export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
  
    // Crear un nuevo usuario
    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
      return this.usuarioService.create(createUsuarioDto);
    }
  
    // Obtener todos los usuarios
    @Get()
    async findAll(): Promise<Usuario[]> {
      return this.usuarioService.findAll();
    }
  
    // Obtener un usuario por ID
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
      return this.usuarioService.findOne(id);
    }
  
    // Actualizar un usuario por ID
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUsuarioDto: UpdateUsuarioDto,
    ): Promise<Usuario> {
      return this.usuarioService.update(id, updateUsuarioDto);
    }
  
    // Eliminar un usuario por ID
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.usuarioService.remove(id);
    }
  }
  