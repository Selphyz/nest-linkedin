import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPostEntity } from './models/post.entity';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [TypeOrmModule.forFeature([FeedPostEntity])],
})
export class FeedModule {}
