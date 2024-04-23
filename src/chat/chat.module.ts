import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
