import { Controller, Post, Request, UseGuards, Body, UnauthorizedException, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('token', access_token, {
      httpOnly: true, // Evita el acceso desde JavaScript en el cliente
      secure: process.env.NODE_ENV === 'production', // Solo envía la cookie en conexiones HTTPS en producción
      sameSite: 'strict', // Protege contra ataques CSRF
      maxAge: 24 * 60 * 60 * 1000, // Configura el tiempo de expiración en 1 día
    });

    return res.send({ message: 'Login exitoso' });
  }

  @Post('login/usuario')
  async loginUsuario(@Body() body, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password, 'usuario');
    if (!user) {
      throw new UnauthorizedException();
    }
    const { access_token } = await this.authService.login(user);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ message: 'Login exitoso' });
  }

  @Post('login/duenotienda')
  async loginDuenoTienda(@Body() body, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password, 'duenotienda');
    if (!user) {
      throw new UnauthorizedException();
    }
    const { access_token } = await this.authService.login(user);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ message: 'Login exitoso' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verifyToken(@Req() req) {
    return { userId: req.user.userId, email: req.user.email };
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    // Limpia la cookie que contiene el token
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return res.send({ message: 'Logout exitoso' });
  }
}
