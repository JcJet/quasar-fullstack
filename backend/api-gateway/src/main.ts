import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { RpcExceptionFilter } from './filter/rcp-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ivi clone API documentation.')
    .setDescription('Includes all reachable from client requests.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  app.enableCors({ credentials: true, origin: true });

  //   app.use(function (req, res, next) {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  //     res.header('Access-Control-Allow-Credentials', true);
  //     next();
  // });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `API Gateway started on ${process.env.APP_PORT} at ${new Date()}.`,
    );
    console.log('Application variables:');
    console.log('RabbitMQ address:', process.env.RMQ_URL);
  });
}

bootstrap();
