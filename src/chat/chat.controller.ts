import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {


    constructor(
        private readonly chatService: ChatService
    ) {}

    @Post('room')
    createRoom(@Body() data: any) {
        this.chatService.createRoom(data.roomname)

        return 'success'
    }

}
