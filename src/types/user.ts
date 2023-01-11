import { ILike } from './like';
import { IMessage } from './message';
import { INotification } from './notification';
import { IPost } from './post';

export interface IUser {
  coverImage: string;
  emailVerified: boolean;
  posts: IPost[];
  likes: ILike[];
  comments: string[];
  followers: [];
  following: [
    {
      _id: '6169e91316cb2265df003c6d';
      user: '6169e58216cb2265df003bf4';
      follower: '6169e206aa57d952c6dc1edd';
      createdAt: '2021-10-15T20:48:19.816Z';
      updatedAt: '2021-10-15T20:48:19.816Z';
      __v: 0;
    }
  ];
  notifications: INotification[];
  messages: IMessage[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
