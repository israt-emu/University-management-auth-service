import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
export const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const id = await generateUserId();
  user.id = id;
  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return newUser;
};
