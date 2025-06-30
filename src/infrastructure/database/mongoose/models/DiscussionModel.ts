import mongoose, { Schema, Document } from 'mongoose';
import { IdVO } from '../../../../domain/shared/value-objects/IdVO';

export interface IDiscussionModel extends Document {
  title: string;
  description: string;
  createdByUserId: IdVO;
  tags: mongoose.Schema.Types.ObjectId[];
  comments: {
    authorId: IdVO;
    text: string;
    createdAt: Date;
  }[];
}

const DiscussionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdByUserId: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    comments: [
      {
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
    ],
  },
  {
    timestamps: true,
  },
);

export const DiscussionModel = mongoose.model<IDiscussionModel>('Discussion', DiscussionSchema);
