import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessages } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/errorResponse';

export const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
