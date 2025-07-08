import DataLoader from 'dataloader';
import { TagEntity } from '@domain/content/entities/TagEntity';
import { TagRepository } from '@domain/content/repositories/TagRepository';

const batchTags =
  (tagRepository: TagRepository) =>
  async (ids: readonly string[]): Promise<TagEntity[]> => {
    const tags = await tagRepository.findByIds([...ids]);
    const tagMap: { [key: string]: TagEntity } = {};
    tags.forEach((tag) => {
      tagMap[tag.getId().getValue()] = tag;
    });
    return ids.map((id) => tagMap[id] || new Error(`No tag found for ID ${id}`));
  };

export interface DataLoaderContextArgs {
  tagRepository: TagRepository;
}

export interface DataLoaderContext {
  loaders: {
    tagLoader: DataLoader<string, TagEntity>;
  };
}

export const buildDataLoaderContext = ({
  tagRepository,
}: DataLoaderContextArgs): DataLoaderContext => {
  return {
    loaders: {
      tagLoader: new DataLoader(batchTags(tagRepository)),
      // In the future we can have other loaders: userLoader: new DataLoader(batchUsers),
    },
  };
};
