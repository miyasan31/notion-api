import { Client } from '@notionhq/client';
import {
  GetBlockResponse,
  GetDatabaseResponse,
  GetPagePropertyResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

export interface GetPagePropertiesResponse {
  title: GetPagePropertyResponse;
  label: GetPagePropertyResponse;
  description: GetPagePropertyResponse;
}

export interface NotionServiceInterface {
  get notion(): Client;

  getDatabases(databaseId: string): Promise<GetDatabaseResponse>;

  getDatabasesQuery(databaseId: string): Promise<QueryDatabaseResponse>;

  getPage(pageId: string): Promise<GetPageResponse>;

  getPagesProperties(pageId: string): Promise<GetPagePropertiesResponse>;

  getPagesProperty(
    pageId: string,
    propertyId: 'title' | 'label' | 'description',
  ): Promise<GetPagePropertyResponse>;

  getBlock(blockId: string): Promise<GetBlockResponse>;

  getBlocks(blockId: string): Promise<ListBlockChildrenResponse>;
}
