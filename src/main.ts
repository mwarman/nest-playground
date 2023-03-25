import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  // create the Nest app
  const app = await NestFactory.create(AppModule);

  // apply third-party middleware
  app.use(helmet());

  // start the application
  await app.listen(3000);
}
bootstrap();
