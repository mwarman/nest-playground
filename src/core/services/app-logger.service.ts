import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger implements LoggerService {
  /**
   * Constructs an AppLogger with dependencies injected.
   * @param configService A ConfigService instance.
   */
  constructor(private configService: ConfigService) {
    super();
    // set the LogLevels value on ConsoleLogger
    // see the .env file for possible values
    super.setLogLevels([configService.get<LogLevel>('LOGGER_LEVEL')]);
  }

  /**
   * Example of how to override a `ConsoleLogger` logging method.
   * @param message
   * @param optionalParams
   */
  log(message: any, ...optionalParams: any[]): void {
    super.log(`OVERRIDDEN: ${message}`, ...optionalParams);
  }
}
