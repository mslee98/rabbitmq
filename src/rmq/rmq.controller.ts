import { Body, Controller, Post } from '@nestjs/common';
import { RmqService } from './rmq.service';

@Controller('rmq')
export class RmqController {
    constructor(private readonly rmqService: RmqService) {}

    @Post('room')
    async createQueue(@Body() data: { room_name: string }) {
        await this.rmqService.createQueue(data.room_name);
        return `Queue ${data.room_name} created successfully`;
    }

}
