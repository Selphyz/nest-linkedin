import { IUser } from '../../auth/models/user.interface';

export interface IFeedPost {
  id?: number;
  body?: string;
  createdAt?: Date;
  author?: IUser;
}
