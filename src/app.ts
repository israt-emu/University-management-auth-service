import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import router from './routes';

const app: Application = express();

//
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use route
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Listening..');
});
//global error handler
app.use(globalErrorHandler);
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessgaes: [{ path: req.originalUrl, message: 'Api not found' }],
  });
  next();
});
export default app;
