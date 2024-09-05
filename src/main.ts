import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // Habilitar CORS
    app.enableCors({
      origin: 'http://localhost:3000', // Permite solicitudes desde este origen frontend
      credentials: true, // Permite el envío de cookies
    });
    app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();
