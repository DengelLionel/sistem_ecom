import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      port:3306,
      database:'ecom_den',
      entities:[],
      username:"root",
      password:"",
      synchronize:true
    } ),
  /*   UsersModule */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
