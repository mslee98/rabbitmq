import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from './rmq/rmq.service';
import { Transport } from '@nestjs/microservices';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RabbitMQ 연결 설정
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
        urls: ['amqp://192.168.0.16:5672'],
        queue: 'default_queue', // 기본 대기열 설정
        persistent: true,
    },
  })

  // 채팅 서비스에 RabbitMQ클라이언트 주입
  app.startAllMicroservices()
  
  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close)
  }
}
bootstrap();
