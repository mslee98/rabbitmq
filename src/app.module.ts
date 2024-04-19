import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqModule } from './rmq/rmq.module';
import { ReceiverModule } from './receiver/receiver.module';
import { SenderModule } from './sender/sender.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Users } from './entities/Users.entity';
import { Rooms } from './entities/Rooms.entity';
import { RoomUsers } from './entities/RoomUsers.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    RmqModule, 
    ReceiverModule, 
    SenderModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Users,
        Rooms,
        RoomUsers
      ],
      logging: true, // log
      synchronize: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
