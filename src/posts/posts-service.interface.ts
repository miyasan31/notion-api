import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { GetPagePropertiesResponse } from '../notion/notion-service.interface';

export interface PostDetailResponse {
  id: number;
  notionPageId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    profile: string;
    twitterId: string;
    gitHubId: string;
  };
  likes: { id: number }[];
  _count: {
    likes: number;
  };
  pageBlocks: ListBlockChildrenResponse;
  pageProperties: GetPagePropertiesResponse;
}

export interface PostListResponse {
  id: number;
  notionPageId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  pageTitle: string;
  likes: { id: number }[];
  _count: {
    likes: number;
  };
}

export interface PostsServiceInterface {
  getPostList(userId: string): Promise<PostListResponse[]>;
  getPostDetail(postId: number, userId: string): Promise<PostDetailResponse>;
}

export const prismaDummyResult = {
  list: [
    {
      // post info
      id: 1,
      notionPageId: '8666335831834bfdb2fc9ca198540497',
      // user info
      user: {
        id: 'miyasan31',
        name: 'みやさん',
        avatar:
          'https://pbs.twimg.com/profile_images/1511856577942552576/ML2kSp4E_400x400.jpg',
      },
      // like info
      likes: [{ id: 1 }],
      _count: {
        likes: 78,
      },
    },
    {
      // post info
      id: 2,
      notionPageId: '4d7632a5f1f64843b13af75db8a31e81',
      // user info
      user: {
        id: 'miyasan31',
        name: 'みやさん',
        avatar:
          'https://pbs.twimg.com/profile_images/1511856577942552576/ML2kSp4E_400x400.jpg',
      },
      // like info
      likes: [],
      _count: {
        likes: 8,
      },
    },
    {
      // post info
      id: 3,
      notionPageId: '019b1f2c46ec4294a6603ce3e7a8e73f',
      // user info
      user: {
        id: 'miyasan31',
        name: 'みやさん',
        avatar:
          'https://pbs.twimg.com/profile_images/1511856577942552576/ML2kSp4E_400x400.jpg',
      },
      // like info
      likes: [],
      _count: {
        likes: 192,
      },
    },
  ],
  detail: {
    // post info
    id: 1,
    notionPageId: '8666335831834bfdb2fc9ca198540497',
    // user info
    user: {
      id: 'miyasan31',
      name: 'みやさん',
      avatar:
        'https://pbs.twimg.com/profile_images/1511856577942552576/ML2kSp4E_400x400.jpg',
      profile: "I'm a programmer.",
      twitterId: 'miyasan_0301',
      gitHubId: 'miyasan31',
    },
    // like info
    likes: [{ id: 1 }],
    _count: {
      likes: 8,
    },
  },
};
