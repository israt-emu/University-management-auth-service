import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import {
  createAcademicSemesterService,
  getAllSemestersService,
  getSingleSemesterService,
  updateSemesterService,
} from './academicSemester.service';
import { filterableFields } from './academicSemester.utils';

export const addAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //
    const semester: IAcademicSemester = req?.body;
    const newSemester = await createAcademicSemesterService(semester);

    if (newSemester) {
      sendResponse<IAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester created successfully!',
        data: newSemester,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Unable to create semester',
      });
    }
    next();
  }
);
export const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const semesters = await getAllSemestersService(filters, paginationOptions);

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully!',
      meta: semesters.meta,
      data: semesters.data,
    });

    next();
  }
);
export const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const semester = await getSingleSemesterService(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!',
      data: semester,
    });

    next();
  }
);
export const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req?.body;

    const updatedSemester = await updateSemesterService(id, updatedData);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully!',
      data: updatedSemester,
    });

    next();
  }
);
