import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { RmqController } from './rmq.controller';

@Module({
  providers: [RmqService],
  exports: [RmqService],
  controllers: [RmqController]
})
export class RmqModule {
  
}
