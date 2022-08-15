import { Injectable } from '@nestjs/common';
import { NotionService } from 'src/notion/notion.service';
import {
  PostDetailResponse,
  PostListResponse,
  PostsServiceInterface,
  prismaDummyResult,
} from './posts-service.interface';

@Injectable()
export class PostsService implements PostsServiceInterface {
  constructor(private notionService: NotionService) {}

  async getPostList(userId: string): Promise<PostListResponse[]> {
    const notionPageIdList = prismaDummyResult['list'].map(
      (item) => item.notionPageId,
    );

    const notionPageTitlePropertyPromiseList = notionPageIdList.map(
      (notionPageId) => {
        return this.notionService.getPageTitleProperty(notionPageId);
      },
    );

    const notionPageTitlePropertyList = await Promise.all([
      ...notionPageTitlePropertyPromiseList,
    ]);

    return prismaDummyResult['list'].map((item, index) => {
      return {
        ...item,
        pageTitle: notionPageTitlePropertyList[index],
      };
    });
  }

  async getPostDetail(
    postId: number,
    userId: string,
  ): Promise<PostDetailResponse> {
    const notionPageBlocksPromise = this.notionService.getBlocks(
      prismaDummyResult['detail'].notionPageId,
    );

    const notionPagePropertiesPromise = this.notionService.getPagesProperties(
      prismaDummyResult['detail'].notionPageId,
    );

    const [notionPageBlocks, notionPageProperties] = await Promise.all([
      notionPageBlocksPromise,
      notionPagePropertiesPromise,
    ]);

    return {
      ...prismaDummyResult['detail'],
      pageProperties: notionPageProperties,
      pageBlocks: notionPageBlocks,
    };
  }
}
