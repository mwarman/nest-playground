import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingsModule } from './greetings/greetings.module';
import { configSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: configSchema,
    }),
    GreetingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
