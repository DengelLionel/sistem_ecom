import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"mysql_db",
      port:3307,
      database:'ecom_den',
      entities:[],
      username:"ecom_user",
      password:"password123",
      synchronize:true
    } ),
  /*   UsersModule */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
