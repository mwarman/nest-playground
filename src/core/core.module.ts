import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppLogger } from './services/app-logger.service';

@Module({
  imports: [ConfigModule],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class CoreModule {}
