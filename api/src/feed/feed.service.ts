import { Injectable } from '@nestjs/common';
import { FeedPostEntity } from './models/post.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from './models/post.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}
  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  readPosts() {
    return from(this.feedPostRepository.find());
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: number) {
    return from(this.feedPostRepository.delete(id));
  }

  findPosts(take: number, skip: number): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <FeedPost[]>posts;
      }),
    );
  }
}
