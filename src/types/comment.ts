import { IUser } from './user';

export interface IComment {
  _id: string;
  comment: string;
  author: IUser;
  post: string;
  createdAt: string;
  updatedAt: string;
}
