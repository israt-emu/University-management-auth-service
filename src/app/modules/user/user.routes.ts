import express from 'express';
import { addUser } from './user.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createUserZodSchema } from './user.validation';
const router = express.Router();

router.post('/create-user', validateRequest(createUserZodSchema), addUser);

export const UserRoutes = router;
