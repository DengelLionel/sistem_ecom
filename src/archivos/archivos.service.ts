import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archivo } from './entities/archivo.entity';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
  ) {}

  async create(createArchivoDto: CreateArchivoDto): Promise<Archivo> {
    const archivo = this.archivoRepository.create(createArchivoDto);
    return this.archivoRepository.save(archivo);
  }

  async findAll(): Promise<Archivo[]> {
    return this.archivoRepository.find({ relations: ['producto', 'categoria'] });
  }

  async findOne(id: number): Promise<Archivo> {
    const archivo = await this.archivoRepository.findOne({
      where: { id },
      relations: ['producto', 'categoria'],
    });
    if (!archivo) {
      throw new NotFoundException(`Archivo con ID ${id} no encontrado`);
    }
    return archivo;
  }
  

  async update(id: number, updateArchivoDto: UpdateArchivoDto): Promise<Archivo> {
    const archivo = await this.findOne(id);
    Object.assign(archivo, updateArchivoDto);
    return this.archivoRepository.save(archivo);
  }

  async remove(id: number): Promise<void> {
    const archivo = await this.findOne(id);
    await this.archivoRepository.remove(archivo);
  }
}
