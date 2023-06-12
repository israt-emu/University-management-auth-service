import { Request, Response } from 'express'
import { IUser } from './users.interface'
import { createUser } from './users.service'
// import { object } from 'webidl-conversions'

export const addUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = req?.body
    const newUser = await createUser(user)
    if (newUser) {
      res.status(200).json({
        status: 'success',
        user: newUser,
      })
    } else {
      res.status(200).json({
        status: 'failed',
        message: 'There was an error occured!',
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    })
  }
}
