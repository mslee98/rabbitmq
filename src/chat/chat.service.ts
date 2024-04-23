import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class ChatService {
    
    constructor(
        private readonly eventsGateway: EventsGateway
    ) {}

    createRoom(roomname) {

    }
}
