import { Module } from '@nestjs/common';
import { NotionModule } from '../notion/notion.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [NotionModule],
})
export class PostsModule {}
