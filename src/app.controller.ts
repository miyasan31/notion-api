import { Controller, Get, Param, Post } from '@nestjs/common';
import {
  GetBlockResponse,
  GetDatabaseResponse,
  GetPagePropertyResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { GetPagePropertiesResponse } from './notion/notion-service.interface';
import { NotionService } from './notion/notion.service';

@Controller()
export class AppController {
  constructor(private readonly notionService: NotionService) {}

  @Get('/databases/:databaseId')
  getDatabases(
    @Param('databaseId') databaseId: string,
  ): Promise<GetDatabaseResponse> {
    return this.notionService.getDatabases(databaseId);
  }

  @Post('/databases/:databaseId/query')
  getDatabaseQuery(
    @Param('databaseId') databaseId: string,
  ): Promise<QueryDatabaseResponse> {
    return this.notionService.getDatabasesQuery(databaseId);
  }

  @Get('/pages/:pageId')
  getPage(@Param('pageId') pageId: string): Promise<GetPageResponse> {
    return this.notionService.getPage(pageId);
  }

  @Get('/pages/:pageId/properties')
  getPageProperties(
    @Param('pageId') pageId: string,
  ): Promise<GetPagePropertiesResponse> {
    return this.notionService.getPagesProperties(pageId);
  }

  @Get('/pages/:pageId/properties/:propertyId')
  getPageProperty(
    @Param('pageId') pageId: string,
    @Param('propertyId') propertyId: 'title' | 'label' | 'description',
  ): Promise<GetPagePropertyResponse> {
    return this.notionService.getPagesProperty(pageId, propertyId);
  }

  @Get('/blocks/:blockId')
  getBlock(@Param('blockId') blockId: string): Promise<GetBlockResponse> {
    return this.notionService.getBlock(blockId);
  }

  @Get('/blocks/:blockId/list')
  getBlocks(
    @Param('blockId') blockId: string,
  ): Promise<ListBlockChildrenResponse> {
    return this.notionService.getBlocks(blockId);
  }
}
