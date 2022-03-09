import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/customers');
  const config = new DocumentBuilder()
    .setTitle('NestJs Demo Project')
    .setDescription('The Demo API description')
    .setVersion('1.0')
    .addTag('Demo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8887);
}
bootstrap();
