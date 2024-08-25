// usuario.service.ts

import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Usuario } from './entities/usuario.entity';
  import { CreateUsuarioDto } from './dto/create-usuario.dto';
  import { UpdateUsuarioDto } from './dto/update-usuario.dto';
  import * as bcrypt from 'bcrypt';
  import { plainToInstance } from 'class-transformer';
  
  @Injectable()
  export class UsuarioService {
    constructor(
      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>,
    ) {}
  
    // Crear un nuevo usuario
    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
      const { email, password, nombre } = createUsuarioDto;
  
      // Verificar si el email ya existe
      const existingUser = await this.usuarioRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está en uso');
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const usuario = this.usuarioRepository.create({
        nombre,
        email,
        password: hashedPassword,
      });
  
      await this.usuarioRepository.save(usuario);
  
      // Excluir la contraseña de la respuesta
      return plainToInstance(Usuario, usuario, { excludeExtraneousValues: true });
    }
  
    // Obtener todos los usuarios
    async findAll(): Promise<Usuario[]> {
      const usuarios = await this.usuarioRepository.find({
        relations: ['pedidos', 'resenas'],
      });
  
      // Excluir la contraseña de cada usuario
      return usuarios.map((usuario) =>
        plainToInstance(Usuario, usuario, { excludeExtraneousValues: true }),
      );
    }
  
    // Obtener un usuario por ID
    async findOne(id: number): Promise<Usuario> {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['pedidos', 'resenas'],
      });
  
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
  
      // Excluir la contraseña de la respuesta
      return plainToInstance(Usuario, usuario, { excludeExtraneousValues: true });
    }
  
    // Actualizar un usuario por ID
    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
      const usuario = await this.usuarioRepository.findOne({ where: { id } });
  
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
  
      const { email, password, nombre } = updateUsuarioDto;
  
      if (email && email !== usuario.email) {
        const existingUser = await this.usuarioRepository.findOne({ where: { email } });
        if (existingUser) {
          throw new ConflictException('El correo electrónico ya está en uso');
        }
        usuario.email = email;
      }
  
      if (nombre) {
        usuario.nombre = nombre;
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        usuario.password = hashedPassword;
      }
  
      await this.usuarioRepository.save(usuario);
  
      // Excluir la contraseña de la respuesta
      return plainToInstance(Usuario, usuario, { excludeExtraneousValues: true });
    }
    async findByEmail(email: string): Promise<Usuario> {
      const usuario = await this.usuarioRepository.findOne({ where: { email } });
      if (!usuario) {
        throw new NotFoundException(`Usuario con email ${email} no encontrado`);
      }
      return usuario;
    }
    // Eliminar un usuario por ID
    async remove(id: number): Promise<void> {
      const usuario = await this.usuarioRepository.findOne({ where: { id } });
  
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
  
      await this.usuarioRepository.remove(usuario);
    }
  }
  