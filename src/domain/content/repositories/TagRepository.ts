import { TagEntity } from '../entities/TagEntity';

export interface TagRepository {
  findByIds(ids: string[]): Promise<TagEntity[]>;
}
