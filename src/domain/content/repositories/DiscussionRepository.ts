import {
  CursorPaginationInputDTO,
  CursorPaginationOutputDTO,
} from '@domain/shared/dtos/PaginationDTO';
import { DiscussionEntity } from '../entities/DiscussionEntity';

export interface DiscussionRepository {
  save(discussion: DiscussionEntity): Promise<void>;
  findAll(input: CursorPaginationInputDTO): Promise<CursorPaginationOutputDTO<DiscussionEntity>>;
}
