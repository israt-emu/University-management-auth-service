import express from 'express';

import { validateRequest } from '../../../middlewares/validateRequest';
import {
  addAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
} from './academicSemester.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(createAcademicSemesterZodSchema),
  addAcademicSemester
);
router.get('/:id', getSingleSemester);
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  updateSemester
);
router.get('/', getAllSemesters);

export const AcademicSemesterRoutes = router;
