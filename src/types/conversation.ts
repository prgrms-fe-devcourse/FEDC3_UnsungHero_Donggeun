import { IUser } from './user';

export interface IConversation {
  _id: string[];
  message: string;
  sender: IUser;
  receiver: IUser;
  seen: boolean;
  createdAt: string;
}
