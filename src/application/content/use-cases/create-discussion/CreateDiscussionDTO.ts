import { DiscussionEntity } from '@domain/content/entities/DiscussionEntity';

export interface CreateDiscussionInput {
  title: string;
  description: string;
  imageUrl?: string;
  createdByUserId: string;
  tagIds: string[];
}

export type CreateDiscussionOutput = Promise<DiscussionEntity>;
