import { Injectable } from '@nestjs/common';
import { ClientProxy, RmqOptions, Transport } from '@nestjs/microservices';
import * as amqp from 'amqplib';

@Injectable()
export class RmqService {
    private connection: amqp.Connection;
    private channel: amqp.Channel
    
    constructor() {
        this.createConnection();
    }

    private async createConnection() {
        this.connection = await amqp.connect('amqp://192.168.0.16:5672');
        this.channel = await this.connection.createChannel();
    }

    async sendMessage(room_name: string, message: string) {
        this.channel.sendToQueue(room_name, Buffer.from(message));
    }

    async createQueue(room_name: string) {
        await this.channel.assertQueue(room_name);
        return 'success'
    }
}
