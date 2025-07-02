export interface CreateDiscussionInput {
  title: string;
  description: string;
  imageUrl?: string;
  createdByUserId: string;
  tagIds: string[];
}

export type CreateDiscussionOutput = Promise<{
  id: string;
  title: string;
  description: string;
  createdByUserId: string;
  tagIds: string[];
  comments: string[];
}>;
