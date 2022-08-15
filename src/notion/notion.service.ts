import { Injectable } from "@nestjs/common";
import { Client } from "@notionhq/client";
import {
  GetBlockResponse,
  GetDatabaseResponse,
  GetPagePropertyResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  PropertyItemListResponse,
  PropertyItemObjectResponse,
  QueryDatabaseResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
  TitlePropertyItemObjectResponse
} from "@notionhq/client/build/src/api-endpoints";
import { GetPagePropertiesResponse, NotionServiceInterface } from "./notion-service.interface";

// const notionToken = 'secret_JWO5HmmoKwi0WElS64gfMfZsmRQ37f851dC49GjINNB';
const notionToken = 'secret_BFymIkjYEf2CldwkhZIybGslMmIy6g2mP1p9eBr8zAP';
const NOTION_MODULE_OPTIONS = 'NotionModuleOptions';
const NOTION_MODULE_ID = 'NotionModuleId';

@Injectable()
export class NotionService implements NotionServiceInterface {
  protected notionClient: Client;

  constructor() {
    this.notionClient = new Client({ auth: notionToken });
  }

  public get notion(): Client {
    return this.notionClient;
  }

  async getDatabases(databaseId: string): Promise<GetDatabaseResponse> {
    return await this.notion.databases.retrieve({
      database_id: databaseId,
    });
  }

  async getDatabasesQuery(databaseId: string): Promise<QueryDatabaseResponse> {
    return await this.notion.databases.query({
      database_id: databaseId,
    });
  }

  async getPage(pageId: string): Promise<GetPageResponse> {
    return await this.notion.pages.retrieve({
      page_id: pageId,
    });
  }

  async getPagesProperties(pageId: string): Promise<GetPagePropertiesResponse> {
    const titlePromise = this.notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: 'title',
    });

    const labelPromise = this.notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: 'label',
    });

    const descriptionPromise = this.notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: 'description',
    });

    const [title, label, description] = await Promise.all([
      titlePromise,
      labelPromise,
      descriptionPromise,
    ]);

    return { title, label, description };
  }

  async getPagesProperty(
    pageId: string,
    propertyId: 'title' | 'label' | 'description',
  ): Promise<GetPagePropertyResponse> {
    return await this.notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });
  }

  async getPageTitleProperty(pageId: string): Promise<string> {
    const res = await this.notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: 'title',
    });

    // MEMO:ここまでするなら@ts-ignoreでも良くね？？
    if (
      isPropertyItemListResponse(res) &&
      isTitlePropertyItemObjectResponse(res.results[0]) &&
      isTextRichTextItemResponse(res.results[0].title)
    ) {
      return res.results[0].title.text.content;
    }

    return 'タイトルなし';
  }

  async getBlock(blockId: string): Promise<GetBlockResponse> {
    return await this.notion.blocks.retrieve({
      block_id: blockId,
    });
  }

  async getBlocks(blockId: string): Promise<ListBlockChildrenResponse> {
    return await this.notion.blocks.children.list({
      block_id: blockId,
    });
  }
}

const isPropertyItemListResponse = (
  response: GetPagePropertyResponse,
): response is PropertyItemListResponse => {
  return response.hasOwnProperty('results');
};

const isTitlePropertyItemObjectResponse = (
  response: PropertyItemObjectResponse,
): response is TitlePropertyItemObjectResponse => {
  return response.hasOwnProperty('title');
};

const isTextRichTextItemResponse = (
  response: RichTextItemResponse,
): response is TextRichTextItemResponse => {
  return response.hasOwnProperty('text');
};
