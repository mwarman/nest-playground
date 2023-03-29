import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppLogger } from './core/services/app-logger.service';

async function bootstrap() {
  // buffer the startup logs while the IoC container is started
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // get an instance of ConfigService
  const configService: ConfigService = app.get(ConfigService);
  // set the global application logger
  app.useLogger(new AppLogger(configService));

  await app.listen(3000);
}
bootstrap();
