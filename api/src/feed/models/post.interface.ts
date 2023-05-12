import { UserEntity } from '../../auth/models/user.entity';

export interface IFeedPost {
  id?: number;
  body?: string;
  createdAt?: Date;
  author?: UserEntity;
}
