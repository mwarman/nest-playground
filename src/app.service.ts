import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  /**
   * This method emits a log message at each possible log level. Useful
   * for experimentation with various configuration settings.
   * @returns {string} A greeting.
   */
  getHello(): string {
    this.logger.debug('debug level message');
    this.logger.verbose('verbose level message');
    this.logger.log(`log level message`);
    this.logger.warn('warn level message');
    this.logger.error('error level message');

    return 'Hello World!';
  }
}
