import { IUser } from './user';

interface IComment {
  comment: string;
}

export interface INotification {
  seen?: boolean;
  _id?: string;
  author?: IUser;
  userId?: IUser | string;
  postId?: string | null;
  follow?: string;
  comment?: IComment;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
  notificationType?: string;
  notificationTypeId?: string;
}
export interface INotificationStatus {
  notificationStatus: boolean;
  setNotification: (bool: boolean) => void;
}
