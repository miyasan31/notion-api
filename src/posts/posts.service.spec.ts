import { Test, TestingModule } from '@nestjs/testing';
import { NotionModule } from '../notion/notion.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
      imports: [NotionModule],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    service
      .getPostDetail(1, '1')
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.id).toEqual(1);
      })
      .catch((err) => {
        expect(err).toBeDefined();
      })
      .finally(() => {
        expect(true).toBeTruthy();
      });
  });
});
