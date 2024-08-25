import { Controller, Post, Request, UseGuards, Body,UnauthorizedException  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login/usuario')
  async loginUsuario(@Body() body) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password, 'usuario');
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('login/duenotienda')
  async loginDuenoTienda(@Body() body) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password, 'duenotienda');
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
