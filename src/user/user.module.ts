import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    AuthModule,
    EventsModule,
  ],
  controllers: [UserController,],
  providers: [UserService],
  exports: [UserModule]
})
export class UserModule {}
