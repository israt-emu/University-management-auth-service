import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/errorResponse';

export const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = [
    {
      path: err?.path,
      message: 'Invalid Object id',
    },
  ];

  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
