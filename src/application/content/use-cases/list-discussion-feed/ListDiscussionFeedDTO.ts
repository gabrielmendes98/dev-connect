import { DiscussionEntity } from '@domain/content/entities/DiscussionEntity';
import {
  CursorPaginationInputDTO,
  CursorPaginationOutputDTO,
} from '@domain/shared/dtos/PaginationDTO';

export type ListDiscussionFeedInput = CursorPaginationInputDTO;

export type ListDiscussionFeedOutput = Promise<CursorPaginationOutputDTO<DiscussionEntity>>;
