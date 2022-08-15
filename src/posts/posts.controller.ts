import { Controller, Get, Param } from '@nestjs/common';
import {
  PostDetailResponse,
  PostListResponse,
} from './posts-service.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * @example {baseUrl}/posts
   * @returns {Promise<PostListResponse[]>} - Notion database response
   */
  @Get('/')
  getPostList(): Promise<PostListResponse[]> {
    const userId = 'userId'; // header-tokenからpassport認証を行ってユーザー情報から取得する（トークン無しアカウントは無視）
    return this.postsService.getPostList(userId);
  }

  /**
   * @example {baseUrl}/posts/:postId
   * @param {string} postId - TaskHub post id
   * @returns {Promise<PostDetailResponse>} - Notion database response
   */
  @Get('/:postId')
  getPostDetail(@Param('postId') postId: number): Promise<PostDetailResponse> {
    const userId = 'userId'; // header-tokenからpassport認証を行ってユーザー情報から取得する（トークン無しアカウントは無視）
    return this.postsService.getPostDetail(postId, userId);
  }
}
