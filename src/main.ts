import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('The movie api for test purpose only.')
    .setVersion('1.0')
    .addTag('movie')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = process.env.PORT ?? 8080;
  await app.listen(port);

  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
