import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface';
import { codeEnum, monthEnum, titleEnum } from './academicSemester.utils';
import { ApiError } from '../../../errors/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: titleEnum,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: codeEnum,
    },
    startMonth: {
      type: String,
      required: true,
      enum: monthEnum,
    },
    endMonth: {
      type: String,
      required: true,
      enum: monthEnum,
    },
  },
  {
    timestamps: true,
  }
);

//handleing same year and same semester issue
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist!'
    );
  }
  next();
});
//model
export const AcademicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
