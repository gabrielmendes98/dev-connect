export interface CreateDiscussionInput {
  title: string;
  description: string;
  imageUrl?: string;
  createdByUserId: string;
  tagIds: string[];
}

export type CreateDiscussionOutput = Promise<void>;
