import { Body, Controller, Post } from '@nestjs/common';
import { RmqService } from 'src/rmq/rmq.service';

@Controller('sender')
export class SenderController {
    constructor(private readonly rmqService: RmqService) {}

    @Post('send')
    async sendMessage(@Body() data: { room_name: string, message: string}) {
        this.rmqService.sendMessage(data.room_name, data.message);
    }
}
