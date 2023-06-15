import express from 'express';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../app/modules/user/user.routes';

const router = express.Router();
const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/academicSemester', route: AcademicSemesterRoutes },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
