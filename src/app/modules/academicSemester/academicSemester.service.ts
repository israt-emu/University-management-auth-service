import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { ApiError } from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelpers';
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
  academicSemesterTitleCodeMapper,
  searchableFields,
} from './academicSemester.utils';
//create semester
export const createAcademicSemesterService = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create a new semester'
    );
  }
  return result;
};
//get all semester
export const getAllSemestersService = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  //

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  //
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //search
  const { searchTerm, ...filtersData } = filters;
  const andconditions = [];
  if (searchTerm) {
    andconditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  //filtering
  if (Object.keys(filtersData).length > 0) {
    andconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition =
    andconditions?.length > 0 ? { $and: andconditions } : {};
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//get single semester
export const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
//update semester
export const updateSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload?.title &&
    payload?.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
