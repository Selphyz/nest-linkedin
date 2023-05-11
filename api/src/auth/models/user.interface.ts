import { IFeedPost } from 'src/feed/models/post.interface';
import { Role } from './role.enum';

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  posts?: IFeedPost[];
}
