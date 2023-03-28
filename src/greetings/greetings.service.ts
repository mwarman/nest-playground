import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';

@Injectable()
export class GreetingsService {
  constructor(private configService: ConfigService) {}

  getGreeting(): string {
    const greeting = this.configService.get<string>('GREETING');
    const audience = this.configService.get<string>('AUDIENCE');

    return `${_.capitalize(greeting)} ${audience}!`;
  }
}
