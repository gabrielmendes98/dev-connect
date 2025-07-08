import {
  CursorPaginationInputDTO,
  CursorPaginationOutputDTO,
} from '@domain/shared/dtos/PaginationDTO';

export type ListDiscussionFeedInput = CursorPaginationInputDTO;

export type ListDiscussionFeedOutput = Promise<
  CursorPaginationOutputDTO<{
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    comments: {
      id: string;
      authorId: string;
      text: string;
      createdAt: Date;
    }[];
    tagIds: string[];
    createdByUserId: string;
    createdAt: Date;
  }>
>;
