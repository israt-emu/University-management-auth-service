import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  Month,
} from './academicSemester.interface';

export const titleEnum: IAcademicSemesterTitle[] = ['Autumn', 'Summer', 'Fall'];
export const codeEnum: IAcademicSemesterCode[] = ['01', '02', '03'];
export const monthEnum: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const searchableFields = ['title', 'code', 'year'];
export const filterableFields = ['searchTerm', 'title', 'code', 'year'];
