import config from '../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'
export const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const id = await generateUserId()
  user.id = id
  const newUser = await User.create(user)

  if (!newUser) {
    throw new Error('Failed to create user')
  }
  return newUser
}
