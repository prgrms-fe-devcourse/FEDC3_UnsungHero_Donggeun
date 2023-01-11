import { IChannel } from './channel';
import { IComment } from './comment';
import { ILike } from './like';
import { IUser } from './user';

export interface IPost {
  likes: ILike[];
  comments: IComment[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: IChannel;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}
