import { ILike } from './like';
import { IMessage } from './message';
import { INotification } from './notification';
import { IPost } from './post';

export interface IUser {
  coverImage?: string;
  image?: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: IPost[];
  likes: ILike[];
  comments: string[];
  followers: [];
  following: [];
  notifications: INotification[];
  messages: IMessage[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
