import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuenoTienda } from './entities/duenotienda.entity';
import { CreateDuenoTiendaDto } from './dto/create-duenotienda.dto';
import { UpdateDuenoTiendaDto } from './dto/update-duenotienda.dto';
import { LoginDuenoTiendaDto } from './dto/login-duenotienda.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DuenoTiendaService {
  constructor(
    @InjectRepository(DuenoTienda)
    private readonly duenoTiendaRepository: Repository<DuenoTienda>,
    private readonly jwtService: JwtService,
  ) {}
  async findByEmail(email: string): Promise<DuenoTienda> {
    const duenoTienda = await this.duenoTiendaRepository.findOne({ where: { email } });
    if (!duenoTienda) {
      throw new NotFoundException(`Dueño de tienda con email ${email} no encontrado`);
    }
    return duenoTienda;
  }
  // Registro de un nuevo dueño de tienda
  async create(createDuenoTiendaDto: CreateDuenoTiendaDto): Promise<DuenoTienda> {
    const { email, password, nombre } = createDuenoTiendaDto;

    // Verificar si el email ya existe
    const existingDueno = await this.duenoTiendaRepository.findOne({ where: { email } });
    if (existingDueno) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const duenoTienda = this.duenoTiendaRepository.create({
      nombre,
      email,
      password: hashedPassword,
    });

    await this.duenoTiendaRepository.save(duenoTienda);

    // Excluir la contraseña de la respuesta
    delete duenoTienda.password;
    return duenoTienda;
  }

  // Inicio de sesión del dueño de tienda
  async login(loginDuenoTiendaDto: LoginDuenoTiendaDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDuenoTiendaDto;
    const duenoTienda = await this.duenoTiendaRepository.findOne({ where: { email } });

    if (!duenoTienda || !(await bcrypt.compare(password, duenoTienda.password))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { email: duenoTienda.email, sub: duenoTienda.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Otros métodos CRUD (findAll, findOne, update, remove)
  async findAll(): Promise<DuenoTienda[]> {
    return this.duenoTiendaRepository.find();
  }

  async findOne(id: number): Promise<DuenoTienda> {
    const duenoTienda = await this.duenoTiendaRepository.findOne({
      where: { id },
    });
    if (!duenoTienda) {
      throw new NotFoundException(`Dueño de tienda con ID ${id} no encontrado`);
    }
    delete duenoTienda.password;
    return duenoTienda;
  }

  async update(id: number, updateDuenoTiendaDto: UpdateDuenoTiendaDto): Promise<DuenoTienda> {
    const duenoTienda = await this.findOne(id);

    Object.assign(duenoTienda, updateDuenoTiendaDto);

    if (updateDuenoTiendaDto.password) {
      duenoTienda.password = await bcrypt.hash(updateDuenoTiendaDto.password, 10);
    }

    await this.duenoTiendaRepository.save(duenoTienda);

    delete duenoTienda.password;
    return duenoTienda;
  }

  async remove(id: number): Promise<void> {
    const duenoTienda = await this.findOne(id);
    await this.duenoTiendaRepository.remove(duenoTienda);
  }
}
