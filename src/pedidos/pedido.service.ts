import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreateOrderDto } from './dto/create-pedido.dto';
import { UsuarioService } from '../usuarios/usuario.service';
import { ProductoService } from '../productos/producto.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Pedido)
    private ordersRepository: Repository<Pedido>,
    private readonly userService: UsuarioService,
    private readonly productService: ProductoService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Pedido> {
    const user = await this.userService.findOne(createOrderDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Pedido();
    order.usuario = user;
    order.total = createOrderDto.total;
    order.metodoPago = createOrderDto.paymentMethod;
    order.productos = [];

    for (const item of createOrderDto.items) {
      const product = await this.productService.findOne(item.productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }
      // Logic to add the item to the order and reduce stock
    }

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Pedido[]> {
    return this.ordersRepository.find({ relations: ['user', 'items'] });
  }
}
