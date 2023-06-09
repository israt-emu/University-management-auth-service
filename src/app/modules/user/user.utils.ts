import { User } from './user.model';

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id;
};
export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  const newId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return newId;
};
