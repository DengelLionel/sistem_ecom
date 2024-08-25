import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './entities/resena.entity';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
  ) {}

  async create(createResenaDto: CreateResenaDto): Promise<Resena> {
    const resena = this.resenaRepository.create(createResenaDto);
    return this.resenaRepository.save(resena);
  }

  async findAll(): Promise<Resena[]> {
    return this.resenaRepository.find({ relations: ['usuario', 'producto'] });
  }

  async findOne(id: number): Promise<Resena> {
    return this.resenaRepository.findOneOrFail({
      where: { id },
      relations: ['usuario', 'producto'],
    });
  }
  
  async update(id: number, updateResenaDto: UpdateResenaDto): Promise<Resena> {
    const resena = await this.findOne(id);
    Object.assign(resena, updateResenaDto);
    return this.resenaRepository.save(resena);
  }

  async remove(id: number): Promise<void> {
    const resena = await this.findOne(id);
    await this.resenaRepository.remove(resena);
  }
}
