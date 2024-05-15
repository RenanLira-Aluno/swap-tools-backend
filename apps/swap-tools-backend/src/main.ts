import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = new DocumentBuilder()
    .setTitle('Swap Tools')
    .setDescription('The Swap Tools API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api')
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  })
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
