import { IUser } from './user';

export interface INotification {
  seen: boolean;
  _id: string;
  author: IUser;
  user: IUser | string;
  post: string | null;
  message?: string;
  updatedAt: string;
}
