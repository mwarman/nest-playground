import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GreetingsController } from './greetings.controller';
import { GreetingsService } from './greetings.service';

@Module({
  imports: [ConfigModule],
  controllers: [GreetingsController],
  providers: [GreetingsService],
})
export class GreetingsModule {}
