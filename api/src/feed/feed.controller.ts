import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedService } from './feed.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { IFeedPost } from './models/post.interface';
import { FeedPostEntity } from './models/post.entity';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() post: IFeedPost, @Request() req): Observable<FeedPostEntity> {
    return this.feedService.createPost(req.user, post);
  }
  @Get()
  findAllPosts(): Observable<FeedPostEntity[]> {
    return this.feedService.readPosts();
  }
  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<FeedPostEntity[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }
  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() feedPost: FeedPostEntity,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }
  @Delete(':id')
  deletePost(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
