import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { RmqService } from 'src/rmq/rmq.service';

@Module({
  controllers: [ReceiverController],
  providers: [RmqService]
})
export class ReceiverModule {}
