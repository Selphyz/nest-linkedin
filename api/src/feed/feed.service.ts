import { Injectable } from '@nestjs/common';
import { FeedPostEntity } from './models/post.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserEntity } from '../auth/models/user.entity';
import { IFeedPost } from './models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(
    user: UserEntity,
    feedPost: IFeedPost,
  ): Observable<FeedPostEntity> {
    feedPost.author = user;
    return from(this.feedPostRepository.save(feedPost));
  }

  readPosts() {
    return from(this.feedPostRepository.find());
  }

  updatePost(id: number, feedPost: FeedPostEntity): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: number) {
    return from(this.feedPostRepository.delete(id));
  }

  findPosts(take: number, skip: number): Observable<FeedPostEntity[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <FeedPostEntity[]>posts;
      }),
    );
  }
}
