import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscussionBaseModel {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdByUserId: string;
  tags: string[];
  comments: {
    _id: string;
    authorId: string;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date;
}

export type IDiscussionModel = Document & IDiscussionBaseModel;

const CommentSubSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    authorId: { type: String, required: true },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

export const DiscussionSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    createdByUserId: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        ref: 'Tag',
      },
    ],
    comments: [CommentSubSchema],
  },
  {
    _id: false,
    versionKey: false,
    timestamps: true,
  },
);

export const DiscussionModel = mongoose.model<IDiscussionModel>('Discussion', DiscussionSchema);
