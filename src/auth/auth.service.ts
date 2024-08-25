import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuario.service';
import { DuenoTiendaService } from '../duenotienda/duenotienda.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly duenoTiendaService: DuenoTiendaService,
    private readonly jwtService: JwtService,
  ) {}

  
  async validateUser(email: string, pass: string, type: string): Promise<any> {
    let user;
    if (type === 'usuario') {
      user = await this.usuarioService.findByEmail(email);
    } else if (type === 'duenotienda') {
      user = await this.duenoTiendaService.findByEmail(email);
    } else {
      throw new UnauthorizedException('Tipo de usuario no válido');
    }

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
