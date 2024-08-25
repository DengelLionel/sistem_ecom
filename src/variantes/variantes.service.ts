import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variante } from './entities/variante.entity';
import { OpcionVariante } from './entities/opcion-variante.entity';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { CreateOpcionVarianteDto } from './dto/create-opcion-variante.dto';
import { UpdateOpcionVarianteDto } from './dto/update-opcion-variante.dto';

@Injectable()
export class VariantesService {
  constructor(
    @InjectRepository(Variante)
    private readonly varianteRepository: Repository<Variante>,
    @InjectRepository(OpcionVariante)
    private readonly opcionVarianteRepository: Repository<OpcionVariante>,
  ) {}

  // Métodos para manejar variantes
  async createVariante(createVarianteDto: CreateVarianteDto): Promise<Variante> {
    const variante = this.varianteRepository.create(createVarianteDto);
    return this.varianteRepository.save(variante);
  }

  async findAllVariantes(): Promise<Variante[]> {
    return this.varianteRepository.find({ relations: ['producto', 'opciones'] });
  }

  async findOneVariante(id: number): Promise<Variante> {
    const variante = await this.varianteRepository.findOne({
      where: { id },
      relations: ['producto', 'opciones'],
    });
    if (!variante) {
      throw new NotFoundException(`Variante con ID ${id} no encontrada`);
    }
    return variante;
  }
  

  async updateVariante(id: number, updateVarianteDto: UpdateVarianteDto): Promise<Variante> {
    const variante = await this.findOneVariante(id);
    Object.assign(variante, updateVarianteDto);
    return this.varianteRepository.save(variante);
  }

  async removeVariante(id: number): Promise<void> {
    const variante = await this.findOneVariante(id);
    await this.varianteRepository.remove(variante);
  }

  // Métodos para manejar opciones de variante
  async createOpcionVariante(createOpcionVarianteDto: CreateOpcionVarianteDto): Promise<OpcionVariante> {
    const opcionVariante = this.opcionVarianteRepository.create(createOpcionVarianteDto);
    return this.opcionVarianteRepository.save(opcionVariante);
  }

  async findAllOpcionesVariante(): Promise<OpcionVariante[]> {
    return this.opcionVarianteRepository.find({ relations: ['variante'] });
  }

  async findOneOpcionVariante(id: number): Promise<OpcionVariante> {
    const opcionVariante = await this.opcionVarianteRepository.findOne({
      where: { id },
      relations: ['variante'],
    });
    if (!opcionVariante) {
      throw new NotFoundException(`Opción de Variante con ID ${id} no encontrada`);
    }
    return opcionVariante;
  }
  

  async updateOpcionVariante(id: number, updateOpcionVarianteDto: UpdateOpcionVarianteDto): Promise<OpcionVariante> {
    const opcionVariante = await this.findOneOpcionVariante(id);
    Object.assign(opcionVariante, updateOpcionVarianteDto);
    return this.opcionVarianteRepository.save(opcionVariante);
  }

  async removeOpcionVariante(id: number): Promise<void> {
    const opcionVariante = await this.findOneOpcionVariante(id);
    await this.opcionVarianteRepository.remove(opcionVariante);
  }
}
