import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

const port = config.port || 5000;
let server: Server;
//uncaught exception handle
process.on('uncaughtException', err => {
  errorLogger.error('uncaught exception', err);
  process.exit(1);
});
//database connection
const db = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    infoLogger.info('Database connected successfully');
    server = app.listen(port, () => {
      infoLogger.info(` App listening on port ${port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }
  //unhandled rejection handle
  process.on('unhandledRejection', error => {
    // console.log('unhandledRejection is detected..', error);
    if (server) {
      server.close(() => {
        errorLogger.error('unhandled rejection', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
db();
//signal terminal
process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is recieved');
  if (server) {
    server.close();
  }
});
