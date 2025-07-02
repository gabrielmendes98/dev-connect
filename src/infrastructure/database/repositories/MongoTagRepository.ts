import { TagEntity } from '../../../domain/content/entities/TagEntity';
import { TagRepository } from '../../../domain/content/repositories/TagRepository';
import { TagMapper } from '../mappers/TagMapper';
import { TagModel } from '../mongoose/models/TagModel';

export class MongoTagRepository implements TagRepository {
  async findByIds(ids: string[]): Promise<TagEntity[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    const mongoTags = await TagModel.find({
      _id: { $in: ids },
    });

    if (!mongoTags || mongoTags.length === 0) {
      return [];
    }

    const tags = mongoTags.map((mongoTag) => TagMapper.toDomain(mongoTag));
    return tags;
  }
}
