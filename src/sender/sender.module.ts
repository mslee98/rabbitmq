import { Module } from '@nestjs/common';
import { SenderController } from './sender.controller';
import { RmqService } from 'src/rmq/rmq.service';

@Module({
  controllers: [SenderController],
  providers: [RmqService]
})
export class SenderModule {}
