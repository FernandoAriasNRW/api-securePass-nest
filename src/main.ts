import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());


  app.useGlobalGuards();


  const config = new DocumentBuilder()
    .setTitle('Securespass API')
    .setDescription('This is the API documentation for Securespass')
    .setVersion('1.0')
    .addTag('securespass')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen( +(process.env.PORT || 3000));
}

bootstrap();
