import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
export const infoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
export const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error-%DATE%.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
