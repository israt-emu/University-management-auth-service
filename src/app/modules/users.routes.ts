import express from 'express'
import { addUser } from './users.controller'
const router = express.Router()

router.post('/create-user', addUser)

export default router
