/* eslint-disable @typescript-eslint/no-explicit-any */
import winston, { Logger as WinstonLoggerType } from 'winston';
import { Logger } from '@application/shared/ports/Logger';

export class WinstonLogger implements Logger {
  private readonly winstonInstance: WinstonLoggerType;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';

    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    const colors = { error: 'red', warn: 'yellow', info: 'green', debug: 'white' };
    winston.addColors(colors);

    const format = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      environment === 'development'
        ? winston.format.colorize({ all: true })
        : winston.format.uncolorize(),
      winston.format.align(),
      winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
      winston.format.errors({ stack: true }),
    );

    const transports = [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/all.log' }),
    ];

    this.winstonInstance = winston.createLogger({
      level: environment === 'development' ? 'debug' : 'info',
      levels,
      format,
      transports,
      exitOnError: false,
    });
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.winstonInstance.info(message, metadata);
  }
  warn(message: string, metadata?: Record<string, any>): void {
    this.winstonInstance.warn(message, metadata);
  }
  error(message: string, metadata?: Record<string, any>): void {
    this.winstonInstance.error(message, metadata);
  }
  debug(message: string, metadata?: Record<string, any>): void {
    this.winstonInstance.debug(message, metadata);
  }
}
