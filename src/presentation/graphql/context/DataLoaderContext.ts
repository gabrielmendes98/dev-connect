import DataLoader from 'dataloader';
import { ITagModel, TagModel } from '@infrastructure/database/mongoose/models/TagModel';

const batchTags = async (ids: readonly string[]): Promise<(ITagModel | Error)[]> => {
  const tags = await TagModel.find({ _id: { $in: ids } });
  const tagMap: { [key: string]: ITagModel } = {};
  tags.forEach((tag) => {
    tagMap[tag.id] = tag;
  });
  return ids.map((id) => tagMap[id] || new Error(`No tag found for ID ${id}`));
};

export interface DataLoaderContext {
  loaders: {
    tagLoader: DataLoader<string, ITagModel>;
  };
}

export const buildDataLoaderContext = (): DataLoaderContext => {
  return {
    loaders: {
      tagLoader: new DataLoader(batchTags),
      // In the future we can have other loaders: userLoader: new DataLoader(batchUsers),
    },
  };
};
