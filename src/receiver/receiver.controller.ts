import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RmqService } from 'src/rmq/rmq.service';

@Controller('receive')
export class ReceiverController {
    constructor(private readonly rmqService: RmqService) {}

    @MessagePattern('my-queue')
    async handleMessage(message: string): Promise<void> {
        console.log(`Received message: ${message}`)
    }

    // @Post('send')
    // async sendMessage(@Body() data: { room_name: string, message: string}) {
    //     this.rmqService.sendMessage(data.room_name, data.message);
    // }
    
}
