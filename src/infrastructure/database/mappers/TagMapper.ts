import { TagEntity } from '@domain/content/entities/TagEntity';
import { ITagModel } from '../mongoose/models/TagModel';

export class TagMapper {
  public static toPersistence(entity: TagEntity): { _id: string; name: string } {
    return {
      _id: entity.getId().getValue(),
      name: entity.getName(),
    };
  }

  public static toDomain(raw: ITagModel): TagEntity {
    return TagEntity.fromPersistence(raw._id, raw.name);
  }
}
