import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get the ConfigService from the application
  const configService = app.get(ConfigService);
  // get the server port from configuration
  const port = configService.get<number>('SERVER_PORT');

  await app.listen(port);
}
bootstrap();
