import { IUser } from './user';

interface IComment {
  post: {
    title: string;
  };
}

interface ILike {
  post: {
    title: string;
  };
}

export interface INotification {
  seen?: boolean;
  _id?: string;
  author?: IUser;
  userId?: IUser | string;
  postId?: string | null;
  follow?: {
    user: string;
  };
  comment?: IComment;
  like?: ILike;
  post?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
  notificationType?: string;
  notificationTypeId?: string;
}
export interface INotificationStatus {
  notificationStatus: boolean;
  changeNotificationStatus: (bool: boolean) => void;
}
