/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { ApiError } from '../errors/ApiError';
import { handleCastError } from '../errors/handleCastError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleZodError } from '../errors/handleZodError';
import { IGenericErrorMessages } from '../interfaces/error';
import { errorLogger } from '../shared/logger';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  //logging error according enviornment
  config.env === 'development'
    ? console.log('🚀globalerrorHandler', err)
    : errorLogger.error('🚀globalerrorHandler', err);
  //
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessages[] = [];

  //decide which response to show according to error

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (err instanceof ApiError) {
    console.log('error----');
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  } //
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } //
  else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  }
  res.status(statusCode).json({
    status: 'failed',
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};
