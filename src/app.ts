import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
//routes
import userRoutes from './app/modules/users.routes'
//
app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//use route
app.use('/api/v1/user', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Listening..')
})
export default app
