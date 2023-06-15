import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { createUser } from './user.service';

export const addUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req?.body;
    const newUser = await createUser(user);

    if (newUser) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: newUser,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Unable to create user',
      });
    }
    next();
  }
);
