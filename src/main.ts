import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import passport from 'passport';
import session from 'express-session';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

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

   /** SwaggerUI 연동 */
  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('api 문서.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'secret_cookie',
      cookie: {
        httpOnly: true
      }
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close)
  }
}
bootstrap();
